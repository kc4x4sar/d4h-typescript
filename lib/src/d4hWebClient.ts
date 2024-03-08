import Axios, { AxiosInstance } from 'axios'
import { wrapper } from 'axios-cookiejar-support'
import { CookieJar } from 'tough-cookie'
import { parse as parseHtml, HTMLElement } from 'node-html-parser'

const MONTHS = [ '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

function d4hWebTimeToDate(d4hTime: string) :Date {
    const parts = d4hTime.trim().split(' ')
    if (parts.length < 3 || !parts[1] || !parts[2]) throw new Error('unrecognized web date format: ' + d4hTime)

    return new Date(`${parts[3]}-${MONTHS.indexOf(parts[2])}-${/^\d+/.exec(parts[1])?.[0]} ${parts[0]}`)
}

export class MissionPage {
    id: string
    root: HTMLElement

    constructor(id: string|number, body: string) {
        this.id = id+''
        this.root = parseHtml(body)
    }

    getTimeline() {
        const headers = this.root.querySelectorAll('#timestamps th')

        return headers.reduce(
            (a, c) => {
                const t = d4hWebTimeToDate(c.parentNode.querySelector('.timestamp_title')?.text ?? '')
                if (!isNaN(t.getTime())) {
                    a[c.text.trim()] = t
                }
                return a
            },
            {} as Record<string, Date>
        )
    }
}

export class D4HWebClient {
    jar: CookieJar = new CookieJar()
    axios: AxiosInstance = Axios.create()

    async setup() {
        if (!this.axios.defaults.baseURL) {
            if (!process.env['D4H_DOMAIN'] || !process.env['D4H_USER'] || !process.env['D4H_PASSWORD']) throw new Error('Missing D4H web config')

            this.axios = wrapper(Axios.create({ jar: this.jar, baseURL: `https://${process.env['D4H_DOMAIN']}.team-manager.us.d4h.com` }))
            await this.axios.get<string>('/')

            const crumb = (await this.jar.getCookies('https://accounts.us.d4h.com/')).find(f => f.key == 'crumb')?.value
            if (!crumb) throw new Error('did not find crumb during login')


            const params = new URLSearchParams()
            params.append('crumb', crumb)
            params.append('email', process.env['D4H_USER'])
            params.append('password', process.env['D4H_PASSWORD'])
            await this.axios.post<string>('https://accounts.us.d4h.com/password',
                params,
                { headers: { 'content-type': 'application/x-www-form-urlencoded'}}
            )

            await this.axios.get('/team')
        }
    }

    async getMissionPage(id: string) {
        await this.setup()
        const response = await this.axios.get<string>(`/team/incidents/view/${id}`)
        return new MissionPage(id, response.data)
    }

    async getMissionReportContributorNames(missionId: string|number) {
        await this.setup()
        const response = await this.axios.get<string>(`/audit/embed?entity_type=incident&entity_id=${missionId}`)
        const root = parseHtml(response.data)
        const rows = root.querySelectorAll('tr')

        const uniqueList = Array.from(new Set(rows.map(tr => tr.querySelectorAll('td')?.[1]?.text.trim())).values()).sort()
        return uniqueList
    }

    async getMileage(activityId: string|number): Promise<Record<number, number>> {
        // The costings table can get out of sync with the attendance table, which breaks the ability to export the CSV
        // and match rows in that file to rows from the API. If you load the costings edit page, the site shows you which rows
        // are out of date, and you have to click an icon to sync each row.
        // The data for both the stale and current values is in the page HTML as JSON, so we grab the JSON from the page source
        // and parse out the entity_id (matches the attendance row id from the API) and the distance in miles.
        await this.setup()
        const response = await this.axios.get<string>(`/team/incidents/edit/${activityId}/costing`)
        const match = /existing_data *?= *?(.*?original_members.*?);/.exec(response.data)
        if (match) {
            const rawData = JSON.parse(match[1] ?? '{}') as { member: { entity_id: number, distance: number }[] }
            return rawData.member.reduce((a,c) => ({ ...a, [c.entity_id]: c.distance }), {} as Record<number, number>)
        }
        return {}
    }
}

import D4HRequest from '../d4hRequest'
import { EntityType } from '../entity'
import type { Member } from '../types/member'
import { GetMemberOptions, GetMembersOptions, D4H_BASE_URL } from '../d4h'

export class membersApi {
    static async getMember(
        request: D4HRequest,
        context: string,
        contextId: number,
        id: number | 'me',
        options?: GetMemberOptions
    ): Promise<Member> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/members/${id}`)

        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.includeDetails !== undefined) {
                optionsList.append('include_details', 'true')
            }
        }

        const member = await request.getAsync<Member>(url)

        if (!member) {
            throw new Error('Member data not found or improperly formatted.')
        }
        member.entityType = EntityType.Member

        return member
    }

    static async getMembers(
        request: D4HRequest,
        context: string,
        contextId: number,
        options?: GetMembersOptions
    ): Promise<Member[]> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/members`)

        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.deleted !== undefined) {
                optionsList.append('deleted', options.deleted.toString())
            }

            if (options.id_tag !== undefined) {
                optionsList.append('id_tag', options.id_tag)
            }

            if (options.name !== undefined) {
                optionsList.append('name', options.name)
            }

            if (options.order !== undefined) {
                optionsList.append('order', options.order)
            }

            if (options.page !== undefined) {
                optionsList.append('page', options.page.toString())
            }

            if (options.size !== undefined) {
                optionsList.append('size', options.size.toString())
            }

            if (options.sort !== undefined) {
                if (Array.isArray(options.sort)) {
                    options.sort.forEach((sortField) => optionsList.append('sort', sortField))
                } else {
                    optionsList.append('sort', options.sort)
                }
            }

            if (options.statuses !== undefined) {
                options.statuses.forEach((status) => {
                    if (status !== null) {
                        optionsList.append('statuses', status.toString())
                    } else {
                        optionsList.append('statuses', 'null')
                    }
                })
            }

            if (options.team_id !== undefined) {
                optionsList.append('team_id', options.team_id.toString())
            }
        }

        const members = await request.getManyAsync<Member>(url)
        members.forEach((m) => (m.entityType = EntityType.Member))

        return members
    }
}

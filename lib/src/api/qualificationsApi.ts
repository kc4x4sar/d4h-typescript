import D4HRequest from '../d4hRequest'
import { EntityType } from '../entity'
import type { Qualification, MemberAwards } from '../types/qualification'
import { D4H_BASE_URL, GetQualificationOptions, GetMemberAwardsOptions } from '../d4h'



export class qualificationsApi {

    static async getMemberQualification(request: D4HRequest, context: string, contextId: number, qualificationId: number | 'me'): Promise<Qualification> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/member-qualifications/${qualificationId}`)

        const qualification = await request.getAsync<Qualification>(url)

        if (!qualification) {
            throw new Error('Qualification data not found or improperly formatted.')
        }
        qualification.entityType = EntityType.Incident

        return qualification
    }

    static async getMemberQualifications(request: D4HRequest, context: string, contextId: number, options?: GetQualificationOptions): Promise<Qualification[]> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/member-qualifications`)

        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.exclude_org_data !== undefined) {
                optionsList.append('exclude_org_data', options.exclude_org_data.toString())
            }

            if (options.exclude_teams_data !== undefined) {
                optionsList.append('exclude_teams_data', options.exclude_teams_data.toString())
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
                    options.sort.forEach(sortField => optionsList.append('sort', sortField))
                } else {
                    optionsList.append('sort', options.sort)
                }
            }

            if (options.title !== undefined) {
                optionsList.append('title', options.title)
            }
        }

        return request.getManyAsync(url)
    }


    static async getAnimalQualification(request: D4HRequest, context: string, contextId: number, qualificationId: number): Promise<Qualification> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/animal-qualifications/${qualificationId}`)

        const qualification = await request.getAsync<Qualification>(url)

        if (!qualification) {
            throw new Error('Qualification data not found or improperly formatted.')
        }
        qualification.entityType = EntityType.Qualification

        return qualification
    }

    static async getAnimalQualifications(request: D4HRequest, context: string, contextId: number, options?: GetQualificationOptions): Promise<Qualification[]> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/animal-qualifications`)

        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.exclude_org_data !== undefined) {
                optionsList.append('exclude_org_data', options.exclude_org_data.toString())
            }

            if (options.exclude_teams_data !== undefined) {
                optionsList.append('exclude_teams_data', options.exclude_teams_data.toString())
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
                    options.sort.forEach(sortField => optionsList.append('sort', sortField))
                } else {
                    optionsList.append('sort', options.sort)
                }
            }

            if (options.title !== undefined) {
                optionsList.append('title', options.title)
            }
        }

        return request.getManyAsync(url)
    }

    static async getHandlerQualification(request: D4HRequest, context: string, contextId: number, qualificationId: number): Promise<Qualification> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/handler-qualifications/${qualificationId}`)

        const qualification = await request.getAsync<Qualification>(url)

        if (!qualification) {
            throw new Error('Qualification data not found or improperly formatted.')
        }
        qualification.entityType = EntityType.Qualification

        return qualification
    }


    static async getHandlerQualifications(request: D4HRequest, context: string, contextId: number, options?: GetQualificationOptions): Promise<Qualification[]> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/handler-qualifications`)

        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.exclude_org_data !== undefined) {
                optionsList.append('exclude_org_data', options.exclude_org_data.toString())
            }

            if (options.exclude_teams_data !== undefined) {
                optionsList.append('exclude_teams_data', options.exclude_teams_data.toString())
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
                    options.sort.forEach(sortField => optionsList.append('sort', sortField))
                } else {
                    optionsList.append('sort', options.sort)
                }
            }

            if (options.title !== undefined) {
                optionsList.append('title', options.title)
            }
        }

        return request.getManyAsync(url)
    }

    static async getMemberAwards(request: D4HRequest, context: string, contextId: number, options?: GetMemberAwardsOptions): Promise<MemberAwards[]> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/member-qualification-awards`)

        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.exclude_org_data !== undefined) {
                optionsList.append('exclude_org_data', options.exclude_org_data.toString())
            }

            if (options.exclude_teams_data !== undefined) {
                optionsList.append('exclude_teams_data', options.exclude_teams_data.toString())
            }

            if (options.member_id !== undefined) {
                optionsList.append('member_id', options.member_id.toString())
            }
            if (options.order !== undefined) {
                optionsList.append('order', options.order)
            }

            if (options.page !== undefined) {
                optionsList.append('page', options.page.toString())
            }

            if (options.qualification_id !== undefined) {
                optionsList.append('qualification_id', options.qualification_id.toString())
            }
            if (options.size !== undefined) {
                optionsList.append('size', options.size.toString())
            }
            if (options.sort !== undefined) {
                if (Array.isArray(options.sort)) {
                    options.sort.forEach(sortField => optionsList.append('sort', sortField))
                } else {
                    optionsList.append('sort', options.sort)
                }
            }
        }

        const awards = await request.getManyAsync<MemberAwards>(url)
        awards.forEach((m) => (m.entityType = EntityType.Award))

        return awards
    }
}
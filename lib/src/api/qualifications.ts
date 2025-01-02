import D4HRequest from '../d4hRequest'
import { EntityType } from '../entity'
import type { Qualification, MemberAwards } from '../types/qualification'
import D4H, { D4H_BASE_URL, D4H_FETCH_LIMIT } from '../d4h'

console.log(D4H_FETCH_LIMIT)

/** @ignore @inline */
export interface GetQualificationOptions {
    exclude_org_data?: boolean; // default: false
    exclude_teams_data?: boolean; // default: false
    order?: 'asc' | 'desc'; // default: 'asc'
    page?: number;
    size?: number;
    sort?: 'createdAt' | 'id' | 'updatedAt'; // default: 'id'
    title?: string;
}

/** @ignore @inline */
export interface GetMemberAwardsOptions {
    exclude_org_data?: boolean; // default: false
    exclude_teams_data?: boolean; // default: false
    member_id?: number | 'me';
    order?: 'asc' | 'desc'; // default: 'asc'
    page?: number;
    qualification_id?: number;
    size?: number;
    sort?: 'createdAt' | 'id' | 'updatedAt'; // default: 'id'
}


export class Qualifications {
    private readonly _request: D4HRequest

    constructor(d4hInstance: D4H) {
        this._request = d4hInstance.request
    }

    async getMemberQualification(context: string, contextId: number, qualificationId: number | 'me'): Promise<Qualification> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/member-qualifications/${qualificationId}`)


        try {
            const qualification = await this._request.getAsync<Qualification>(url)
            qualification.entityType = EntityType.Incident
            return qualification
        } catch (error) {
            throw new Error('Qualification data not found or improperly formatted.')
        }
    }

    async getMemberQualifications(context: string, contextId: number, options?: GetQualificationOptions): Promise<Qualification[]> {
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
                    options.sort.forEach(sortField => {
                        if (typeof sortField === 'string') {
                            optionsList.append('sort', sortField)
                        } else {
                            console.warn('Skipping invalid sort field: ', sortField)
                        }
                    })
                } else if (typeof options.sort === 'string') {
                    optionsList.append('sort', options.sort)
                } else {
                    console.warn('Invalid sort field type:', typeof options.sort)
                }
            }

            if (options.title !== undefined) {
                optionsList.append('title', options.title)
            }
        }

        return this._request.getManyAsync(url)
    }


    async getAnimalQualification(context: string, contextId: number, qualificationId: number): Promise<Qualification> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/animal-qualifications/${qualificationId}`)


        try {
            const qualification = await this._request.getAsync<Qualification>(url)
            qualification.entityType = EntityType.Qualification
            return qualification
        } catch (error) {
            throw new Error('Qualification data not found or improperly formatted.')
        }
    }

    async getAnimalQualifications(context: string, contextId: number, options?: GetQualificationOptions): Promise<Qualification[]> {
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
                    options.sort.forEach(sortField => {
                        if (typeof sortField === 'string') {
                            optionsList.append('sort', sortField)
                        } else {
                            console.warn('Skipping invalid sort field: ', sortField)
                        }
                    })
                } else if (typeof options.sort === 'string') {
                    optionsList.append('sort', options.sort)
                } else {
                    console.warn('Invalid sort field type:', typeof options.sort)
                }
            }

            if (options.title !== undefined) {
                optionsList.append('title', options.title)
            }
        }

        const qualifications = await this._request.getManyAsync<Qualification>(url)
        qualifications.forEach((m) => (m.entityType = EntityType.Qualification))

        return qualifications
    }

    async getHandlerQualification(context: string, contextId: number, qualificationId: number): Promise<Qualification> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/handler-qualifications/${qualificationId}`)


        try {
            const qualification = await this._request.getAsync<Qualification>(url)
            qualification.entityType = EntityType.Qualification
            return qualification
        } catch (error) {
            throw new Error('Qualification data not found or improperly formatted.')
        }
    }


    async getHandlerQualifications(context: string, contextId: number, options?: GetQualificationOptions): Promise<Qualification[]> {
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
                    options.sort.forEach(sortField => {
                        if (typeof sortField === 'string') {
                            optionsList.append('sort', sortField)
                        } else {
                            console.warn('Skipping invalid sort field: ', sortField)
                        }
                    })
                } else if (typeof options.sort === 'string') {
                    optionsList.append('sort', options.sort)
                } else {
                    console.warn('Invalid sort field type:', typeof options.sort)
                }
            }

            if (options.title !== undefined) {
                optionsList.append('title', options.title)
            }
        }

        const qualifications = await this._request.getManyAsync<Qualification>(url)
        qualifications.forEach((m) => (m.entityType = EntityType.Qualification))

        return qualifications
    }

    async getMemberAwards(context: string, contextId: number, options?: GetMemberAwardsOptions): Promise<MemberAwards[]> {
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
                    options.sort.forEach(sortField => {
                        if (typeof sortField === 'string') {
                            optionsList.append('sort', sortField)
                        } else {
                            console.warn('Skipping invalid sort field: ', sortField)
                        }
                    })
                } else if (typeof options.sort === 'string') {
                    optionsList.append('sort', options.sort)
                } else {
                    console.warn('Invalid sort field type:', typeof options.sort)
                }
            }
        }

        const awards = await this._request.getManyAsync<MemberAwards>(url)
        awards.forEach((m) => (m.entityType = EntityType.Award))

        return awards
    }
}
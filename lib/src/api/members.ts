import D4HRequest from '../d4hRequest'
import { EntityType } from '../entity'
import type { Member } from '../types/member'
import D4H, { D4H_BASE_URL } from '../d4h'
import type { MemberUpdate } from '../types/member'


/** @ignore @inline */
export interface GetMemberOptions {
    includeDetails?: boolean;
}

/** @inline */
export interface GetMembersOptions {
    deleted?: boolean; // default: false
    id?: number | number[]
    id_tag?: string;
    name?: string;
    order?: 'asc' | 'desc'; /** @defaultValue asc */
    page?: number;
    size?: number;
    sort?: 'createdAt' | 'id' | 'updatedAt'; // default: 'id'
    statuses?: (number | null)[]; // list of ids or null
    team_id?: number; // the numeric identifier for a team resource
}

export class Members {
    private readonly _request: D4HRequest

    constructor(d4hInstance: D4H) {
        this._request = d4hInstance.request
    }


    /**
     * 
     * @param context - The point of view from where the request takes place
     * @param contextId - Either a team, organisation or admin's id
     * @param id - Member the resource belongs to. Either an id or "me"
     * @returns - A member
     */
    async getMember(
        context: 'admin' | 'organisation' | 'team',
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

        try {
            const member = await this._request.getAsync<Member>(url)
            member.entityType = EntityType.Member
            return member
        } catch (error) {
            throw new Error('Member data not found or improperly formatted.')
        }
    }


    /**
     * 
     * @param context - The point of view from where the request takes place
     * @param contextId - Either a team, organisation or admin's id
     * @param options.deleted - Return only deleted members
     * @param options.id - A list of ids
     * @param options.id_tag - RFID tag or barcode
     * @param options.name - The member's name
     * @param options.order - 
     * @param options.page - Page number
     * @param options.size - Items per page
     * @param options.sort - 
     * @param options.statuses - One or more member statuses. Some statuses require extra permissions.
     * @param options.team_id - The numeric identifier for a resource
     * @returns - A list of members
     */
    async getMembers(
        context: 'admin' | 'organisation' | 'team',
        contextId: number,
        options?: GetMembersOptions
    ): Promise<Member[]> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/members`)

        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.deleted !== undefined) {
                optionsList.append('deleted', options.deleted.toString())
            }

            if (options.id !== undefined) {
                optionsList.append('id', options.id.toString())
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

        const members = await this._request.getManyAsync<Member>(url)
        members.forEach((m) => (m.entityType = EntityType.Member))

        return members
    }


    /**
     * 
     * @param context 
     * @param contextId 
     * @param id 
     * @param updates 
     * @returns 
     */
    updateMember(context: string, contextId: number, id: number, updates: MemberUpdate): Promise<void> {
        // If no updates, no need to actually make a request. Exit early.
        if (Object.getOwnPropertyNames(updates).length === 0) {
            return Promise.resolve()
        }

        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/members/${id}`)
        return this._request.putAsync(url, updates)
    }

}

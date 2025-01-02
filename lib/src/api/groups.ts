import D4HRequest from '../d4hRequest'
import { EntityType } from '../entity'
import D4H, { D4H_BASE_URL } from '../d4h'
import type { groupMembership, memberGroup } from '../types/group'

/** @ignore @inline */
export interface GetMemberGroupsOptions {
    id?: number;
    order?: 'asc' | 'desc'; // default: 'asc'
    page?: number;
    size?: number;
    sort?: 'createdAt' | 'id' | 'updatedAt'; // default: 'id'
    team_id?: number | number[];
    title?: string;
}

/** @ignore @inline */
export interface GetMemberGroupMembershipOptions {
    group_id?: number | number[];
    id?: number | number[];
    member_id?: number | number[];
    order?: 'asc' | 'desc'; // default: 'asc'
    page?: number;
    size?: number;
    sort?: 'createdAt' | 'id' | 'updatedAt'; // default: 'id'
    team_id?: number | number[];
}


export class Groups {
    private readonly _request: D4HRequest

    constructor(d4hInstance: D4H) {
        this._request = d4hInstance.request
    }

    async getMemberGroup(
        context: string,
        contextId: number,
        groupId: number,
    ): Promise<memberGroup> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/member-groups/${groupId}`)

        try {
            const group = await this._request.getAsync<memberGroup>(url)
            group.entityType = EntityType.memberGroup
            return group
        } catch (error) {
            throw new Error('Group data not found or improperly formatted.')
        }
    }

    async getMemberGroups(
        context: string,
        contextId: number,
        options?: GetMemberGroupsOptions
    ): Promise<memberGroup[]> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/member-groups`)

        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.id !== undefined) {
                optionsList.append('id_tag', options.id.toString())
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

            if (options.team_id !== undefined) {
                optionsList.append('team_id', options.team_id.toString())
            }

            if (options.title !== undefined) {
                optionsList.append('title', options.title)
            }
        }

        const groups = await this._request.getManyAsync<memberGroup>(url)
        groups.forEach((m) => (m.entityType = EntityType.memberGroup))

        return groups
    }

    async getMemberGroupMemberships(
        context: string,
        contextId: number,
        options?: GetMemberGroupMembershipOptions
    ): Promise<groupMembership[]> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/member-groups`)

        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.group_id !== undefined) {
                optionsList.append('group_id', options.group_id.toString())
            }

            if (options.id !== undefined) {
                optionsList.append('id_tag', options.id.toString())
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

            if (options.team_id !== undefined) {
                optionsList.append('team_id', options.team_id.toString())
            }
        }

        const groups = await this._request.getManyAsync<groupMembership>(url)
        groups.forEach((m) => (m.entityType = EntityType.groupMembership))

        return groups
    }
}
import D4HRequest from '../d4hRequest'
import { EntityType } from '../entity'
import type { groupMembership, memberGroup } from '../types/group'
import { GetMemberGroupsOptions, GetMemberGroupMembershipOptions, D4H_BASE_URL } from '../d4h'

export class groupsApi {
    static async getMemberGroup(
        request: D4HRequest,
        context: string,
        contextId: number,
        groupId: number,
    ): Promise<memberGroup> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/member-groups/${groupId}`)

        const group = await request.getAsync<memberGroup>(url)

        if (!group) {
            throw new Error('Group data not found or improperly formatted.')
        }
        group.entityType = EntityType.memberGroup

        return group
    }

    static async getMemberGroups(
        request: D4HRequest,
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
                    options.sort.forEach((sortField) => optionsList.append('sort', sortField))
                } else {
                    optionsList.append('sort', options.sort)
                }
            }

            if (options.team_id !== undefined) {
                optionsList.append('team_id', options.team_id.toString())
            }

            if (options.title !== undefined) {
                optionsList.append('title', options.title)
            }
        }

        const groups = await request.getManyAsync<memberGroup>(url)
        groups.forEach((m) => (m.entityType = EntityType.memberGroup))

        return groups
    }

    static async getMemberGroupMemberships(
        request: D4HRequest,
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
                    options.sort.forEach((sortField) => optionsList.append('sort', sortField))
                } else {
                    optionsList.append('sort', options.sort)
                }
            }

            if (options.team_id !== undefined) {
                optionsList.append('team_id', options.team_id.toString())
            }
        }

        const groups = await request.getManyAsync<groupMembership>(url)
        groups.forEach((m) => (m.entityType = EntityType.groupMembership))

        return groups
    }
}
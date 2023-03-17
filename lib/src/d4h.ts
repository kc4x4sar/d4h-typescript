import HttpUtils from './httpUtils'
import type { Group } from './group'
import type { Member } from './member'

const D4H_FETCH_LIMIT = 250
const D4H_BASE_URL = 'https://api.d4h.org/v2'

export interface GetMemberOptions {
    includeDetails?: boolean;
}

export interface GetMembersOptions {
    groupId?: number;
    includeCustomFields?: boolean;
    includeDetails?: boolean;
}

export interface GetGroupsOptions {
    memberId?: number;
    title?: string;
}

export default class D4H {
    private readonly _httpUtils: HttpUtils

    constructor(token: string) {
        this._httpUtils = new HttpUtils(token, D4H_FETCH_LIMIT)
    }

    /********************************************/
    /**************** MEMBERS *******************/
    /********************************************/
    
    async getMember(id: number, options?: GetMemberOptions): Promise<Member> {
        const url = new URL(`${D4H_BASE_URL}/team/members/${id}`)
        
        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.includeDetails !== undefined) {
                optionsList.append('include_details', 'true')
            }
        }

        return await this._httpUtils.get<Member>(url)
    }

    async getMembers(options?: GetMembersOptions): Promise<Member[]> {
        const url = new URL(`${D4H_BASE_URL}/team/members`)

        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.groupId !== undefined) {
                optionsList.append('group_id', options.groupId.toString())
            }

            if (options.includeDetails !== undefined) {
                optionsList.append('include_details', 'true')
            }

            if (options.includeCustomFields !== undefined) {
                optionsList.append('include_custom_fields', 'true')
            }
        }

        return await this._httpUtils.getMany(url)
    }

    /********************************************/
    /***************** GROUPS *******************/
    /********************************************/

    async getGroup(id: number): Promise<Group> {
        const url = new URL(`${D4H_BASE_URL}/team/groups/${id}`)
        return await this._httpUtils.get<Group>(url)
    }

    async getGroups(options?: GetGroupsOptions): Promise<Group[]> {
        const url = new URL(`${D4H_BASE_URL}/team/groups`)

        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.memberId !== undefined) {
                optionsList.append('member_id', options.memberId.toString())
            }

            if (options.title !== undefined) {
                optionsList.append('title', options.title)
            }
        }

        return await this._httpUtils.getMany(url)
    }
}
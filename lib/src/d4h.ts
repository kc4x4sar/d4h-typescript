import { CustomFieldUpdate } from './customField'
import { Entity, EntityType } from './entity'
import type { Group } from './group'
import HttpUtils from './httpUtils'
import type { Member, MemberUpdate } from './member'

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
    
    async getMemberAsync(id: number, options?: GetMemberOptions): Promise<Member> {
        const url = new URL(`${D4H_BASE_URL}/team/members/${id}`)
        
        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.includeDetails !== undefined) {
                optionsList.append('include_details', 'true')
            }
        }

        const member = await this._httpUtils.getAsync<Member>(url)
        member.type = EntityType.Member

        return member
    }

    async getMembersAsync(options?: GetMembersOptions): Promise<Member[]> {
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

        const members = await this._httpUtils.getManyAsync<Member>(url)
        members.forEach(m => m.type = EntityType.Member)

        return members
    }

    updateMemberAsync(id: number, updates: MemberUpdate): Promise<Member> {
        const url = new URL(`${D4H_BASE_URL}/team/members/${id}`)
        return this._httpUtils.putAsync(url, updates)
    }

    /********************************************/
    /***************** GROUPS *******************/
    /********************************************/

    getGroupAsync(id: number): Promise<Group> {
        const url = new URL(`${D4H_BASE_URL}/team/groups/${id}`)
        return this._httpUtils.getAsync<Group>(url)
    }

    getGroupsAsync(options?: GetGroupsOptions): Promise<Group[]> {
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

        return this._httpUtils.getManyAsync(url)
    }

    /********************************************/
    /************** CUSTOM FIELDS ***************/
    /********************************************/

    updateCustomFields(entity: Entity, updates: CustomFieldUpdate[], onlyMemberEditOwn: boolean): Promise<void> {
        const url = new URL(`${D4H_BASE_URL}/team/custom-fields/${entity.type}/${entity.id}`)

        // From the documentation:
        // https://api.d4h.org/v2/documentation#operation/putTeamCustomfieldsEntity_typeEntity_id
        // The PUT action for fields is distinguished by Bundle. If you include one field's value
        // from a bundle (or an unbundled field's value) you must include values for all fields
        // of that bundle (or all unbundled fields)
        // ----------------------------------------------------------------------------------------
        // To ensure a mistake doesn't occur, let's ensure that *all* custom fields from the original
        // entity are in the list of updates.

        // At this time all entities we're working with have custom fields. As a result, throw an
        // error if none are found. This most likely indicates the original request was made without
        // including custom fields.
        const originalCustomFields = entity.custom_fields
        if (!originalCustomFields) {
            throw new Error('Cannot update custom fields for an entity with no custom fields. Ensure your original request included custom fields.')
            
        }

        // For any fields not being changed, back fill from the original entity to ensure
        // they retain the same value.
        for (const field of originalCustomFields) {
            if (field.bundle !== null) {
                throw new Error('One or more custom fields on the entity are part of a bundle. Bundles are not supported.')
            }

            const update = updates.find((u) => u.id == field.id)
            if (update && onlyMemberEditOwn && !field.member_edit_own) {
                throw new Error('onlyMemberEditOwn specified, but attempting to update non-memberEditOwn field.')
            } else if (!update) {
                let include = true
                if (onlyMemberEditOwn && !field.member_edit_own) {
                    include = false
                }

                if (include) {
                    updates.push({
                        id: field.id,
                        value: field.value
                    })
                }
            }
        }

        return this._httpUtils.putAsync(url, { fields: updates })
    }
}
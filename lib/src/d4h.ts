import { CustomFieldUpdate } from './types/customField'
import D4HRequest from './d4hRequest'
import { Entity, EntityType } from './entity'
import type { memberGroup } from './types/group'
import type { Member, MemberUpdate } from './types/member'
import type { Qualification, MemberAwards } from './types/qualification'
import type { Incident } from './types/incident'
import type { Animal } from './types/animal'
import { membersApi } from './api/membersApi'
import { animalsApi } from './api/animalsApi'
import { qualificationsApi } from './api/qualificationsApi'
import { groupsApi } from './api/groupsApi'

const D4H_FETCH_LIMIT = 250
const D4H_BASE_URL = 'https://api.team-manager.us.d4h.com/v3' // Multiple API endpoints now, probably should handle multiple

export { D4H_BASE_URL }

export interface GetMemberOptions {
    includeDetails?: boolean;
}

export interface GetMembersOptions {
    deleted?: boolean; // default: false
    id_tag?: string;
    name?: string;
    order?: 'asc' | 'desc'; // default: 'asc'
    page?: number;
    size?: number;
    sort?: string | string[]; // default: 'id'
    statuses?: (number | null)[]; // list of ids or null
    team_id?: number; // the numeric identifier for a team resource
}

export interface GetAnimalsOptions {
    handler_member_id?: number | number[];
    id?: number | number[];
    order?: 'asc' | 'desc'; // default: 'asc'
    page?: number;
    size?: number;
    sort?: string | string[]; // default: 'id'
    status?: string; // list of ids or null
    team_id?: number; // the numeric identifier for a team resource
}

export interface GetGroupsOptions {
    memberId?: number;
    title?: string;
}

export interface GetIncidentOptions {
    after?: string;
    before?: string;
    deleted?: boolean; // default: 'false'
    ends_before?: string;
    id?: number | number[];
    order?: 'asc' | 'desc'; // default: 'asc'
    page?: number;
    published?: boolean;
    reference?: string;
    size?: number;
    sort?: string | string[]; // default: 'id'
    starts_after?: string;
    tag_bundle_id?: number;
    tag_id?: number;
    team_id?: number;
}

export interface GetQualificationOptions {
    exclude_org_data?: boolean; // default: false
    exclude_teams_data?: boolean; // default: false
    order?: 'asc' | 'desc'; // default: 'asc'
    page?: number;
    size?: number;
    sort?: string | string[]; // default: 'id'
    title?: string;
}

export interface GetMemberAwardsOptions {
    exclude_org_data?: boolean; // default: false
    exclude_teams_data?: boolean; // default: false
    member_id?: number | 'me';
    order?: 'asc' | 'desc'; // default: 'asc'
    page?: number;
    qualification_id?: number;
    size?: number;
    sort?: string | string[]; // default: 'id'
}

export interface GetMemberGroupsOptions {
    id: number;
    order?: 'asc' | 'desc'; // default: 'asc'
    page?: number;
    size?: number;
    sort?: string | string[]; // default: 'id'
    team_id?: number | number[];
    title?: string;
}

export default class D4H {
    private readonly _request: D4HRequest

    constructor(token: string) {
        this._request = new D4HRequest(token, D4H_FETCH_LIMIT)
    }

    /********************************************/
    /**************** MEMBERS *******************/
    /********************************************/
    
    async getMember(
        context: string,
        contextId: number,
        id: number | 'me',
        options?: GetMemberOptions
    ): Promise<Member> {
        return membersApi.getMember(this._request, context, contextId, id, options)
    }

    async getMembers(
        context: string,
        contextId: number,
        options?: GetMembersOptions
    ): Promise<Member[]> {
        return membersApi.getMembers(this._request, context, contextId, options)
    }

    updateMember(context: string, contextId: number, id: number, updates: MemberUpdate): Promise<void> {
        // If no updates, no need to actually make a request. Exit early.
        if (Object.getOwnPropertyNames(updates).length === 0) {
            return Promise.resolve()
        }

        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/members/${id}`)
        return this._request.putAsync(url, updates)
    }

    /********************************************/
    /**************** ANIMALS *******************/
    /********************************************/

    async getAnimal(
        context: string,
        contextId: number,
        id: number | 'me',
    ): Promise<Animal> {
        return animalsApi.getAnimal(this._request, context, contextId, id)
    }

    async getAnimals(
        context: string,
        contextId: number,
        options?: GetAnimalsOptions
    ): Promise<Animal[]> {
        return animalsApi.getAnimals(this._request, context, contextId, options)
    }

    /********************************************/
    /*********** EMERGENCY CONTACTS *************/
    /********************************************/

    // Emergency Contacts no longer have specific endpoint

    /********************************************/
    /***************** GROUPS *******************/
    /********************************************/

    async getMemberGroup(
        context: string,
        contextId: number,
        groupId: number,
    ): Promise<memberGroup> {
        return groupsApi.getMemberGroup(this._request, context, contextId, groupId)
    }

    async getMemberGroups(
        context: string,
        contextId: number,
        options?: GetMemberGroupsOptions
    ): Promise<memberGroup[]> {
        return groupsApi.getMemberGroups(this._request, context, contextId, options)
    }

    /********************************************/
    /**************** INCIDENTS *****************/
    /********************************************/

    async getIncident(context: string, contextId: number, activityId: number): Promise<Incident> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/incidents/${activityId}`)

        const incident = await this._request.getAsync<Incident>(url)
        
        if (!incident) {
            throw new Error('Incident data not found or improperly formatted.')
        }
        incident.entityType = EntityType.Incident

        return incident
    }

    async getIncidents(context: string, contextId: number, options?: GetIncidentOptions): Promise<Incident[]> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/incidents`)

        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.after !== undefined) {
                optionsList.append('after', options.after)
            }
            if (options.before !== undefined) {
                optionsList.append('before', options.before)
            }
            if (options.deleted !== undefined) {
                optionsList.append('order', options.deleted.toString())
            }
            if (options.ends_before !== undefined) {
                optionsList.append('ends_before', options.ends_before)
            }
            if (options.id !== undefined) {
                optionsList.append('id', options.id.toString())
            }
            if (options.order !== undefined) {
                optionsList.append('order', options.order)
            }
            if (options.page !== undefined) {
                optionsList.append('page', options.page.toString())
            }
            if (options.published !== undefined) {
                optionsList.append('published', options.published.toString())
            }
            if (options.reference !== undefined) {
                optionsList.append('reference', options.reference)
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
            if (options.starts_after !== undefined) {
                optionsList.append('starts_after', options.starts_after)
            }
            if (options.tag_bundle_id !== undefined) {
                optionsList.append('tag_bundle_id', options.tag_bundle_id.toString())
            }
            if (options.tag_id !== undefined) {
                optionsList.append('tag_id', options.tag_id.toString())
            }
            if (options.team_id !== undefined) {
                optionsList.append('team_id', options.team_id.toString())
            }
        }

        return this._request.getManyAsync(url)
    }

    /********************************************/
    /************* QUALIFICATIONS ***************/
    /********************************************/

    async getMemberQualification(
        context: string,
        contextId: number,
        id: number | 'me',
    ): Promise<Qualification> {
        return qualificationsApi.getMemberQualification(this._request, context, contextId, id)
    }

    async getMemberQualifications(
        context: string,
        contextId: number,
        options?: GetQualificationOptions
    ): Promise<Qualification[]> {
        return qualificationsApi.getMemberQualifications(this._request, context, contextId, options)
    }

    async getAnimalQualification(
        context: string,
        contextId: number,
        id: number,
    ): Promise<Qualification> {
        return qualificationsApi.getAnimalQualification(this._request, context, contextId, id)
    }

    async getAnimalQualifications(
        context: string,
        contextId: number,
        options?: GetQualificationOptions
    ): Promise<Qualification[]> {
        return qualificationsApi.getAnimalQualifications(this._request, context, contextId, options)
    }

    async getHandlerQualification(
        context: string,
        contextId: number,
        id: number,
    ): Promise<Qualification> {
        return qualificationsApi.getHandlerQualification(this._request, context, contextId, id)
    }

    async getHandlerQualifications(
        context: string,
        contextId: number,
        options?: GetQualificationOptions
    ): Promise<Qualification[]> {
        return qualificationsApi.getHandlerQualifications(this._request, context, contextId, options)
    }

    async getMemberAwards(
        context: string,
        contextId: number,
        options?: GetMemberAwardsOptions
    ): Promise<MemberAwards[]> {
        return qualificationsApi.getMemberAwards(this._request, context, contextId, options)
    }
    
    /********************************************/
    /************** CUSTOM FIELDS ***************/
    /********************************************/



    updateCustomFields(entity: Entity, updates: CustomFieldUpdate[], onlyMemberEditOwn: boolean): Promise<void> {
        // If no updates, no need to actually make a request. Exit early.
        if (updates.length === 0) {
            return Promise.resolve()
        }
        
        const url = new URL(`${D4H_BASE_URL}/team/custom-fields/${entity.entityType}/${entity.id}`)

        // From the documentation:
        // https://api.d4h.org/v2/documentation#operation/putTeamCustomfieldsEntity_typeEntity_id
        // The PUT action for fields is distinguished by Bundle. If you include one field's value
        // from a bundle (or an unbundled field's value) you must include values for all fields
        // of that bundle (or all unbundled fields)
        // ----------------------------------------------------------------------------------------
        // To ensure a mistake doesn't occur, let's ensure that *all* unbundled custom fields from the original
        // entity are in the list of updates.
        //
        // At this time we don't actively use any custom fields in a bundle. To save on the additional complexity,
        // bundled custom fields are not supported and will result in an error if attempting to update them.

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
            const update = updates.find((u) => u.id == field.id)
            if (update) {
                if (onlyMemberEditOwn && !field.member_edit_own) {
                    throw new Error('onlyMemberEditOwn specified, but attempting to update non-memberEditOwn field.')
                } else if (field.bundle) {
                    throw new Error('One or more custom fields being updated are part of a bundle. Updating fields in a bundle is not supported.')
                }
            } else {
                let include = true
                if (field.bundle || (onlyMemberEditOwn && !field.member_edit_own)) {
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

        return this._request.putAsync(url, { fields: updates })
    }
}

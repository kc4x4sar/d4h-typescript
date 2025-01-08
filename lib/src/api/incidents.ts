import D4HRequest from '../d4hRequest'
import { EntityType } from '../entity'
import D4H, { D4H_BASE_URL } from '../d4h'
import type { Incident } from '../types/incident'

/** @ignore @inline */
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
    sort?: 'createdAt' | 'id' | 'updatedAt'; // default: 'id'
    starts_after?: string;
    tag_bundle_id?: number;
    tag_id?: number;
    team_id?: number;
}

export class Incidents {
    private readonly _request: D4HRequest

    constructor(d4hInstance: D4H) {
        this._request = d4hInstance.request
    }


    /**
     * @param context - The point of view from where the request takes place
     * @param contextId - Either a team, organisation or admin's id
     * @param activityId - An activity identifier
     * @returns - An incident
     */
    async getIncident(context: 'admin' | 'organisation' | 'team', contextId: number, activityId: number): Promise<Incident> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/incidents/${activityId}`)


        try {
            const incident = await this._request.getAsync<Incident>(url)
            incident.entityType = EntityType.Incident
            return incident
        } catch (error) {
            throw new Error('Incident data not found or improperly formatted.')
        }
    }


    /**
     * @param context - The point of view from where the request takes place
     * @param contextId - Either a team, organisation or admin's id
     * @param options.after - Return only activities ending after this datetime
     * @param options.before - Return only activities starting before this datetime
     * @param options.deleted - Return only deleted activities
     * @param options.ends_before - Return only activities ending before this datetime
     * @param options.id - A list of ids
     * @param options.order -  Default: "asc"
     * @param options.page - Page number
     * @param options.published - Return only published activities
     * @param options.reference - A simple text search term, compared against the reference and reference description
     * @param options.size - Items per page
     * @param options.sort -  Default: "id"
     * @param options.starts_after - Return only activities starting after this datetime
     * @param options.tag_bundle_id - Return only activities with this tag bundle id
     * @param options.tag_id - Return only activities with this tag id
     * @param options.team_id - Return only activities with this team id
     * @returns - A list of incidents
     */
    async getIncidents(context: 'admin' | 'organisation' | 'team', contextId: number, options?: GetIncidentOptions): Promise<Incident[]> {
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
                optionsList.append('deleted', options.deleted.toString())
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
}
import D4HRequest from '../d4hRequest'
import { EntityType } from '../entity'
import D4H, { D4H_BASE_URL } from '../d4h'
import { Activity } from '../types/activity';


/** @ignore @inline */
export interface GetActivityAttendOptions {
    activity_id?: number | number[];
    activity_resource_type?: string;
    deleted?: boolean;
    ends_after?: string;
    ends_before?: string;
    id?: number | number[];
    member_id?: number | number[];
    order?: 'asc' | 'desc'; // default: 'asc'
    page?: number;
    role_id?: number | number[];
    size?: number;
    sort?: 'createdAt' | 'id' | 'updatedAt'; // default: 'id'
    starts_after?: string;
    starts_before?: string;
    status?: string; // list of ids or null
}

export class Activities {
    private readonly _request: D4HRequest

    constructor(d4hInstance: D4H) {
        this._request = d4hInstance.request
    }


    /**
     * @param context - The point of view from where the request takes place
     * @param contextId - Either a team, organisation or admin's id
     * @param attendanceId - The numeric identifier for a resource
     * @returns - An animal item
     */
    async getActivityAttendance(context: 'admin' | 'organisation' | 'team', contextId: number, attendanceId: number): Promise<Activity> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/attendance/${attendanceId}`)
        
        try {
            const activity = await this._request.getAsync<Activity>(url)
            activity.entityType = EntityType.Activity
            return activity
        } catch (error) {
            throw new Error('Attendance data not found or improperly formatted.')
        }
    }


    /**
     * @param context - The point of view from where the request takes place
     * @param contextId - Either a team, organisation or admin's id
     * @param options.activity_id - One or more activity resource identifiers
     * @param options.activity_resource_type - One or more attendance statuses
     * @param options.deleted - Return only attendances from deleted activities
     * @param options.ends_after - Return only resources ending after this datetime
     * @param options.ends_before - Return only resources ending before this datetime
     * @param options.id - A list of ids
     * @param options.member_id - One or more member resource identifiers
     * @param options.order -  Default: "asc"
     * @param options.page - Page number
     * @param options.role_id - One or more role resource identifiers
     * @param options.size - Items per page
     * @param options.sort -  Default: "id"
     * @param options.starts_after - Return only resources starting after this datetime
     * @param options.starts_before - Return only resources starting before this datetime
     * @param options.status - One or more attendance statuses
     */
    async getActivityAttendances(context: 'admin' | 'organisation' | 'team', contextId: number, options?: GetActivityAttendOptions): Promise<Activity[]> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/attendance`)

        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.activity_id !== undefined) {
                optionsList.append('activity_id', options.activity_id.toString())
            }
            if (options.activity_resource_type !== undefined) {
                optionsList.append('activity_resource_type', options.activity_resource_type.toString())
            }
            if (options.ends_after !== undefined) {
                optionsList.append('ends_after', options.ends_after.toString())
            }
            if (options.ends_before !== undefined) {
                optionsList.append('ends_before', options.ends_before.toString())
            }
            if (options.id !== undefined) {
                optionsList.append('id', options.id.toString())
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
            if (options.role_id !== undefined) {
                optionsList.append('role_id', options.role_id.toString())
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
    
            if (options.starts_before !== undefined) {
                optionsList.append('starts_before', options.starts_before.toString())
            }
            if (options.starts_after !== undefined) {
                optionsList.append('starts_after', options.starts_after.toString())
            }
            if (options.status !== undefined) {
                optionsList.append('status', options.status)
            }
        }

        const activity = await this._request.getManyAsync<Activity>(url)
        activity.forEach(m => m.entityType = EntityType.Activity)

        return activity
    }

}
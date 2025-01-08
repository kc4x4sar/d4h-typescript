import D4HRequest from '../d4hRequest'
import { EntityType } from '../entity'
import D4H, { D4H_BASE_URL, D4H_FETCH_LIMIT } from '../d4h'
import { Role } from '../types/role'

console.log(D4H_FETCH_LIMIT)


export class Roles {
    private readonly _request: D4HRequest

    constructor(d4hInstance: D4H) {
        this._request = d4hInstance.request
    }

    /**
     * 
     * @param context - The point of view from where the request takes place
     * @param contextId - Either a team, organisation or admin's id
     * @param roleId - A role id
     * @returns - A role
     */
    async getMemberQualification(context: 'admin' | 'organisation' | 'team', contextId: number, roleId: number | 'me'): Promise<Role> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/roles/${roleId}`)

        try {
            const role = await this._request.getAsync<Role>(url)
            role.entityType = EntityType.Role
            return role
        } catch (error) {
            throw new Error('Role data not found or improperly formatted.')
        }
    }
}
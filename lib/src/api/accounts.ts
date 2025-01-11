import D4HRequest from '../d4hRequest'
import D4H, { D4H_BASE_URL } from '../d4h'
import { WhoAmIType } from '../types/accounts'

export class Accounts {
    private readonly _request: D4HRequest

    constructor(d4hInstance: D4H) {
        this._request = d4hInstance.request
    }


    /**
     * @param context - The point of view from where the request takes place
     * @param contextId - Either a team, organisation or admin's id
     * @returns - Access details of credentials for a specific context
     */
    async whoAmI(context: 'admin' | 'organisation' | 'team', contextId: number): Promise<WhoAmIType> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/whoami`)
        
        try {
            const whoami = await this._request.getAsync<WhoAmIType>(url)
            return whoami
        } catch (error) {
            throw new Error('Data not found or improperly formatted.')
        }
    }

    /**
     * @returns - Access details of credentials for all available contexts
     */
    async whoAmIAll(): Promise<WhoAmIType> {
        const url = new URL(`${D4H_BASE_URL}/v3/whoami`)
        
        try {
            const whoami = await this._request.getAsync<WhoAmIType>(url)
            return whoami
        } catch (error) {
            throw new Error('Data not found or improperly formatted.')
        }
    }
}
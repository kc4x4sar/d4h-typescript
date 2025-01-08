import D4HRequest from './d4hRequest'
import { Team } from './types/team'
import { Organisation } from './types/organisation'
import { EntityType } from './entity'


/** @ignore */
const D4H_FETCH_LIMIT = 250

/** @ignore */
const D4H_BASE_URL = 'https://api.team-manager.us.d4h.com/v3' // Multiple API endpoints now, probably should handle multiple

export { D4H_BASE_URL, D4H_FETCH_LIMIT }

class D4H {
    private readonly _request: D4HRequest

    constructor(token: string) {
        this._request = new D4HRequest(token, D4H_FETCH_LIMIT)
    }


    get request(): D4HRequest {
        return this._request
    }


}

class Teams {
    private readonly _request: D4HRequest

    constructor(d4hInstance: D4H) {
        this._request = d4hInstance.request
    }

    /**
     * @param context - The point of view from where the request takes place
     * @param contextId - Either a team, organisation or admin's id
     * @param teamId - A team's id
     * @returns - A team
     */
    async getTeam(
        context: 'admin' | 'organisation' | 'team',
        contextId: number,
        teamId: number,
    ): Promise<Team> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/teams/${teamId}`)

        try {
            const team = await this._request.getAsync<Team>(url)
            team.entityType = EntityType.Team
            return team
        } catch (error) {
            throw new Error('Team data not found or improperly formatted.')
        }
    }
}

class Organisations {
    private readonly _request: D4HRequest

    constructor(d4hInstance: D4H) {
        this._request = d4hInstance.request
    }

    /**
     * @param context - The point of view from where the request takes place
     * @param contextId - Either a team, organisation or admin's id
     * @param organisationId - An organisation's id
     * @returns - A organisation
     */
    async getOrganisation(
        context: 'admin' | 'organisation' | 'team',
        contextId: number,
        organisationId: number,
    ): Promise<Organisation> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/organisations/${organisationId}`)

        try {
            const organisation = await this._request.getAsync<Organisation>(url)
            organisation.entityType = EntityType.Organisation
            return organisation
        } catch (error) {
            throw new Error('Organisation data not found or improperly formatted.')
        }
    }
}

export {
    Teams,
    Organisations,
}
export default D4H
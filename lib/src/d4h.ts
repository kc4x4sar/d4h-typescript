import D4HRequest from './d4hRequest'


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

export {
    D4H,
}
export default D4H
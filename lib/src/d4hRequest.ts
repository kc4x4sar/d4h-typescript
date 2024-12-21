interface D4HResponse<DataType> {
    status: number
    data?: DataType
}

interface D4HError {
    error: string
    statusText: string
    status: number
}

enum HttpMethod {
    Get = 'GET',
    Put = 'PUT',
}

export default class D4HRequest {
    private readonly _fetchLimit: number
    private readonly _token: string

    constructor(token: string, fetchLimit: number) {
        if (!token) {
            throw new Error('Token cannot be empty')
        }

        this._fetchLimit = fetchLimit
        this._token = token
    }

    async requestAsync<TBody, TResponse>(url: URL, method: HttpMethod, body?: TBody): Promise<TResponse> {
        const headers = {
            'Authorization': `Bearer ${this._token}`,
            'Content-Type': 'application/json'
        }

        //console.log(`${method}: ${url.toString()}\n${JSON.stringify(body)}`)

        const options: RequestInit = {
            method,
            headers,
        }

        if (body) {
            options.body = JSON.stringify(body)
        }

        const rawResponse = await fetch(url.toString(), options)
        const response = await rawResponse.json() as D4HResponse<TResponse> & D4HError
        if (rawResponse.status !== 200) { // error handling may need to be updated
            console.log(rawResponse)
            throw new Error(`${rawResponse.status} : ${rawResponse.statusText}`)
        }

        return response as TResponse
    }

    async getAsync<DataType>(url: URL): Promise<DataType> {
        return this.requestAsync<never, DataType>(url, HttpMethod.Get)
    }

    async getManyAsync<DataType>(url: URL, paginate: boolean = false): Promise<DataType[]> {
        let results: DataType[] = []


        if (paginate) {
            let offset = 0
    
            // Pagination loop
            while (true) {
                const urlWithOffset = new URL(url)
                urlWithOffset.searchParams.append('offset', offset.toString())
                urlWithOffset.searchParams.append('limit', this._fetchLimit.toString())
    
                const newResults = await this.getAsync<DataType[]>(urlWithOffset)
                results = results.concat(newResults)
                offset += this._fetchLimit
    
                if (newResults.length < this._fetchLimit) {
                    break
                }
            }
        } else {
            // Fetch without pagination
            const newResults = await this.getAsync<DataType[]>(url)
            results = results.concat(newResults)
        }
    
        return results
    }

    async putAsync<TBody, TResponse>(url: URL, body: TBody): Promise<TResponse> {
        return this.requestAsync(url, HttpMethod.Put, body)
    }
}

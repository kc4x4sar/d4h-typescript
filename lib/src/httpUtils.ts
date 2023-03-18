interface D4HResponse<DataType> {
    statusCode: number
    data: DataType
}

interface D4HError {
    error: string
    message: string
    statusCode: number
}

enum HttpMethod {
    Get = 'GET',
    Put = 'PUT',
}

export default class HttpUtils {
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
    
        console.log(url)

        const options: RequestInit = {
            method,
            headers,
        }

        if (body) {
            options.body = JSON.stringify(body)
        }
    
        const rawResponse = await fetch(url.toString(), options)
        const response = await rawResponse.json() as D4HResponse<TResponse> & D4HError
    
        if (response.statusCode !== 200) {
            const d4hError = response as D4HError
            throw new Error(`${d4hError.statusCode}: ${d4hError.error}: ${d4hError.message}`)
        }
    
        return response.data
    }

    async getAsync<DataType>(url: URL): Promise<DataType> {
        return this.requestAsync<never, DataType>(url, HttpMethod.Get)
    }
    
    async getManyAsync<DataType>(url: URL): Promise<DataType[]> {
        let results: DataType[] = []
        
        let offset = 0
        
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition
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
        
        return results
    }

    async putAsync<TBody, TResponse>(url: URL, body: TBody): Promise<TResponse> {
        return this.requestAsync(url, HttpMethod.Put, body)
    }
}

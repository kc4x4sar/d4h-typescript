import fetch from 'node-fetch';
import type { Member } from "./member";

const D4H_FETCH_LIMIT = 250;
const D4H_BASE_URL = "https://api.d4h.org/v2";

interface D4HResponse<DataType> {
    statusCode: number;
    data: DataType;
    error: string;
}

interface D4HError {
    statusCode: number;
    error: string;
}

export interface GetMemberOptions {
    includeDetails?: boolean;
}

export interface GetMembersOptions {
    groupId?: number;
    includeCustomFields?: boolean;
    includeDetails?: boolean;
}

export default class D4H {
    private readonly _token: string;

    constructor(token: string) {
        if (!token) {
            throw new Error("Token cannot be empty");
        }

        this._token = token;
    }

    async getMember(id: number, options?: GetMemberOptions): Promise<Member> {
        let url = new URL(`${D4H_BASE_URL}/team/members/${id}`)
        
        if (options !== undefined) {
            let optionsList = url.searchParams;

            if (options.includeDetails !== undefined) {
                optionsList.append("include_details", "true");
            }
        }

        return await this.get<Member>(url);
    }

    async getMembers(options?: GetMembersOptions): Promise<Member[]> {
        let members: Member[] = [];
        let baseUrl = new URL(`${D4H_BASE_URL}/team/members`)

        if (options !== undefined) {
            let optionsList = baseUrl.searchParams;

            if (options.groupId !== undefined) {
                optionsList.append("group_id", "true");
            }

            if (options.includeDetails !== undefined) {
                optionsList.append("include_details", "true");
            }

            if (options.includeCustomFields !== undefined) {
                optionsList.append("include_custom_fields", "true");
            }
        }

        let offset = 0;
        while (true) {
            let url = new URL(baseUrl);
            url.searchParams.append('offset', offset.toString());

            let newMembers = await this.get<Member[]>(url);
            members = members.concat(newMembers);
            offset += D4H_FETCH_LIMIT;

            if (newMembers.length < D4H_FETCH_LIMIT) {
                break;
            }
        }

        return members;
    }

    private async get<DataType>(url: URL): Promise<DataType> {
        let method = "GET";
        let headers = {
            "Authorization": `Bearer ${this._token}`,
        };

        console.log(url);

        let rawResponse = await fetch(url.toString(), { method, headers });
        let response = await rawResponse.json() as D4HResponse<DataType>;

        if (response.statusCode !== 200) {
            throw response as D4HError;
        }

        return response.data as DataType;
    }
}
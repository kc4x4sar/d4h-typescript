import D4HRequest from '../d4hRequest'
import { EntityType } from '../entity'
import type { Animal } from '../types/animal'
import D4H, { D4H_BASE_URL } from '../d4h'


/** @ignore @inline */
export interface GetAnimalsOptions {
    handler_member_id?: number | number[];
    id?: number | number[];
    order?: 'asc' | 'desc'; // default: 'asc'
    page?: number;
    size?: number;
    sort?: 'createdAt' | 'id' | 'updatedAt'; // default: 'id'
    status?: 'NON_OPERATIONAL' | 'OPERATIONAL'; // list of ids or null
    team_id?: number; // the numeric identifier for a team resource
}

export class Animals {
    private readonly _request: D4HRequest

    constructor(d4hInstance: D4H) {
        this._request = d4hInstance.request
    }


    /**
     * @param context - The point of view from where the request takes place
     * @param contextId - Either a team, organisation or admin's id
     * @param animalId - An animal id
     * @returns - An animal item
     */
    async getAnimal(context: 'admin' | 'organisation' | 'team', contextId: number, animalId: number | 'me'): Promise<Animal> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/animals/${animalId}`)
        
        try {
            const animal = await this._request.getAsync<Animal>(url)
            animal.entityType = EntityType.Animal
            return animal
        } catch (error) {
            throw new Error('Animal data not found or improperly formatted.')
        }
    }


    /**
     * @param context - The point of view from where the request takes place
     * @param contextId - Either a team, organisation or admin's id
     * @param options.handler_member_id - The member id or ids of the animal's handler(s)
     * @param options.id - A list of ids
     * @param options.order -  Default: "asc"
     * @param options.page - Page number
     * @param options.size - Items per page
     * @param options.sort -  Default: "id"
     * @param options.status - The status of the animal
     * @param options.team_id - The numeric identifier for a resource
     * @returns - A list of animals
     */
    async getAnimals(context: 'admin' | 'organisation' | 'team', contextId: number, options?: GetAnimalsOptions): Promise<Animal[]> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/animals`)

        if (options !== undefined) {
            const optionsList = url.searchParams

            if (options.handler_member_id !== undefined) {
                optionsList.append('handler_member_id', options.handler_member_id.toString())
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
    
            if (options.status !== undefined) {
                optionsList.append('status', options.status)
            }
    
            if (options.team_id !== undefined) {
                optionsList.append('team_id', options.team_id.toString())
            }
            
        }

        const animals = await this._request.getManyAsync<Animal>(url)
        animals.forEach(m => m.entityType = EntityType.Animal)

        return animals
    }

}
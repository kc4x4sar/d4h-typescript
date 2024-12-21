import D4HRequest from '../d4hRequest'
import { EntityType } from '../entity'
import type { Animal } from '../types/animal'
import { GetAnimalsOptions, D4H_BASE_URL } from '../d4h'

export class animalsApi {


    static async getAnimal(request: D4HRequest, context: string, contextId: number, animalId: number | 'me'): Promise<Animal> {
        const url = new URL(`${D4H_BASE_URL}/${context}/${contextId}/animals/${animalId}`)

        const animal = await request.getAsync<Animal>(url)
        
        if (!animal) {
            throw new Error('Animal data not found or improperly formatted.')
        }
        animal.entityType = EntityType.Animal

        return animal
    }

    static async getAnimals(request: D4HRequest, context: string, contextId: number, options?: GetAnimalsOptions): Promise<Animal[]> {
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
                    options.sort.forEach(sortField => optionsList.append('sort', sortField))
                } else {
                    optionsList.append('sort', options.sort)
                }
            }
    
            if (options.status !== undefined) {
                optionsList.append('status', options.status)
            }
    
            if (options.team_id !== undefined) {
                optionsList.append('team_id', options.team_id.toString())
            }
            
        }

        const animals = await request.getManyAsync<Animal>(url)
        animals.forEach(m => m.entityType = EntityType.Animal)

        return animals
    }

}
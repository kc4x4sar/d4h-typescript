import { Entity } from '../entity'
import { resourceType } from './generic'


export interface costs {
    hour: number,
    use: number
}

export interface Role extends Entity{
    id: number,
    title: string,
    deprecatedBundle: string,
    owner: resourceType,
    order: number,
    cost: costs,
    resourceType: string,
    createdAt: string,
    upatedAt: string
}
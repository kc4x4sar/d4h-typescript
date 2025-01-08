import { Entity } from '../entity'
import { resourceType } from './generic'


/** @ignore @inline */
export interface location {
    type: string,
    coordinates: [number, number],
}


/** @ignore @inline */
export interface counts {
    total: number,
    operational: number,
}


/** @ignore @inline */
export interface Team extends Entity {
    id: number,
    owner: resourceType,
    title: string,
    location: location,
    memberCounts: counts,
    timezone: string,
    country: string,
    deletedAt: null,
    overview: string,
    createdAt: string,
    updatedAt: string,
    subdomain: string,
    resourceType: string,
}
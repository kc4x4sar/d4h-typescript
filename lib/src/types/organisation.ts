import { Entity } from '../entity'

/** @ignore @inline */
export interface Organisation extends Entity {
    id: number,
    title: string,
    country: string,
    timezone: string,
    createdAt: string,
    updatedAt: string,
    resourceType: string,
}
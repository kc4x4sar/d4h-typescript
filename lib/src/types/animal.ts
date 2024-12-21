import { Entity } from '../entity'

export interface Animal extends Entity {
    id: number;
    name: string;
    breed: string;
    type: string;
    countRollingHours: number;
    ref: string;
    notes: string;
    status: string;
    resourceType: string;
    bornAt: string;
    joinedAt: string;
    leftAt: string | null;
    createdAt: string;
    updatedAt: string;
}
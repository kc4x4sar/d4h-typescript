import { Entity } from '../entity'
import { resourceType } from './type';

export interface Qualification extends Entity {
    id: number,
    cost: number | null,
    createdAt: string,
    description: string,
    expiredCost: null,
    reminderDays: number,
    title: string,
    updatedAt: string,
    resourceType: string,
    deprecatedBundle: string,
    expiresMonthsDefault: number | null,
}

export interface MemberAwards extends Entity {
    id: number;
    createdAt: string;
    updatedAt: string;
    resourceType: string;
    startsAt: string | null;
    endsAt: string | null;
    owner: resourceType;
    member: resourceType;
    qualification: resourceType;
}
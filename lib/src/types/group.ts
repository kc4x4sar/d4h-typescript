import { Entity } from '../entity'

export interface memberGroup extends Entity{
    id: number;
    title: string;
    deprecatedBundle: string;
    membershipResourceType: string;
    resourceType: string;
    createdAt: string;
    updatedAt: string;
}
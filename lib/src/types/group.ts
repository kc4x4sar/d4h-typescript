import { Entity } from '../entity'
import { resourceType } from './type';

export interface memberGroup extends Entity{
    id: number;
    title: string;
    deprecatedBundle: string;
    membershipResourceType: string;
    resourceType: string;
    createdAt: string;
    updatedAt: string;
}

export interface groupMembership extends Entity{
    id: number;
    owner: resourceType;
    group: resourceType;
    member: resourceType;
}
import { Entity } from '../entity'
import { resourceType } from './generic';

export interface Activity extends Entity {

activity: resourceType;
createdAt: string;
duration: number;
endsAt: string;
id: number;
member: resourceType;
owner: resourceType;
startsAt: string;
status: string;
resourceType: string;
role: resourceType;
updatedAt: string;

}
import { CustomField } from './types/customField'

export interface Entity {
    custom_fields?: CustomField[];
    id: number;
    entityType: EntityType;
}

// EntityType must be one of:
// event, exercise, gear, healthsafety_report, incident,
// incident.weather, member, person_involved, unit, activity
//
// Only the ones actively in use are implemented.
export enum EntityType {
    Member = 'member',
    memberGroup = 'membergroup',
    groupMembership = 'groupmembership',
    Incident = 'incident',
    Qualification = 'qualification',
    Award = 'award',
    Animal = 'animal'
}

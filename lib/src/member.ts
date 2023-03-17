export enum CustomFieldType {
    Number = 'number',
    Text = 'text',
    Date = 'date',
}

export interface CustomField {
    id: number;
    type: CustomFieldType;
    label: string;
    value_string: string | null;
    value: string | null;
}

export interface EmergencyContact {
    name: string | null;
    relation: string | null;
    phone: string | null;
    alt_phone: string | null;
}

export interface MemberStatus {
    id: number;
    type: string;
    value: string;
    label: MemberStatusLabel | null;
}

export interface MemberStatusLabel {
    id: number;
    value: string;
}

export interface Member {
    address: string;
    custom_fields?: CustomField[];
    email: string | null;
    emergency_contacts: EmergencyContact[];
    group_ids: number[] | null;
    homephone: string;
    id: number;
    mobilephone: string;
    name: string;
    notes: string | null;
    position: string;
    ref: string;
    status: MemberStatus;
    workphone: string;
}
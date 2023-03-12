export enum CustomFieldType {
    Number = "number",
    Text = "text",
    Date = "date",
}

export interface CustomField {
    id: number;
    type: CustomFieldType;
    label: string;
    value_string: string | undefined;
    value: string | undefined;
}

export interface EmergencyContact {
    name: string;
    relation: string;
    phone: string;
    alt_phone: string;
}

export interface MemberStatus {
    id: number;
    type: string;
    value: string;
    label: MemberStatusLabel | undefined;
}

export interface MemberStatusLabel {
    id: number;
    value: string;
}

export interface Member {
    address: string;
    custom_fields: CustomField[];
    email: string;
    emergency_contacts: EmergencyContact;
    group_ids: number[];
    homephone: string;
    id: number;
    mobilephone: string;
    name: string;
    notes: string;
    position: string;
    ref: string;
    status: MemberStatus;
    workphone: string;
}
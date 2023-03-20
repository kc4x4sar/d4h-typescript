import { Entity } from './entity'

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

export interface Member extends Entity {
    address: string;
    email: string | null;
    emergency_contacts: EmergencyContact[];
    group_ids: number[] | null;
    homephone: string;
    mobilephone: string;
    name: string;
    notes: string | null;
    position: string;
    ref: string;
    status: MemberStatus;
    workphone: string;
}

export interface MemberUpdate {
    name?: string | null
    ref?: string | null
    id_tag?: string | null
    status_id?: number
    status_custom_id?: number
    retired_reason_id?: number
    date_leave?: Date
    date_join?: Date
    position?: string | null
    role_id?: number
    cost_per_hour?: number
    cost_per_use?: number
    address_street?: string | null
    address_city?: string | null
    address_region?: string | null
    address_postcode?: string | null
    address_country?: string | null
    lat?: number
    lng?: number
    gridref?: string | null
    location_bookmark_id?: number
    email?: string | null
    phone_mobile?: string | null
    phone_home?: string | null
    phone_work?: string | null
    pager?: string | null
    pager_email?: string | null
    address?: string | null
    notes?: string | null
}
import { Entity } from '../entity'
import { resourceType } from './type'

/** @ignore @inline */
export interface MemberStatus {
    id: number
    type: string
    value: string
    label: MemberStatusLabel | null
}

/** @ignore @inline */
export interface MemberStatusLabel {
    id: number
    value: string
}

/** @ignore @inline */
export interface EmailInfo {
    value: string
    verified: boolean
}

/** @ignore @inline */
export interface PhoneInfo {
    phone: string
    verified?: boolean
}

/** @ignore @inline */
export interface emergencyContact {
    name: string
    primaryPhone: string
    secondaryPhone: string
    relation: string
}

/** @inline */
export interface Location {
    type: string
    coordinates: [number, number]
}


export interface Member extends Entity {
    id: number
    name: string
    ref: string
    status: string
    position: string
    createdAt: string
    updatedAt: string
    startsAt: string | null
    endsAt: string | null
    lastLogin: string | null
    weeklyDayOfWeek: number
    weeklyDayOfWeekUtc: number
    weeklyHourOfDay: number
    weeklyHourOfDayUtc: number
    email: EmailInfo
    home: PhoneInfo
    mobile: PhoneInfo
    work: PhoneInfo
    pager: PhoneInfo
    notes: string | null
    permission: number
    credits: number
    defaultDuty: string
    defaultEquipmentLocation: resourceType
    customStatus: resourceType
    location: Location
    locationBookmark: resourceType
    retiredReason: resourceType
    role: resourceType
    primaryEmergencyContact: emergencyContact
    secondaryEmergencyContact: emergencyContact
    alertActivityApproval: boolean
    alertAllQualifications: boolean
    alertGear: boolean
    alertQualifications: boolean
    chatAutosubscribe: boolean
    chatDailyDigest: boolean
    contactUpdateMail: boolean
    weeklyMail: boolean
    deprecatedAddress: string | null
    icalSecret: string | null
    costPerHour: number | null
    costPerUse: number | null
    countReportingEvent: number
    countReportingExercise: number
    countReportingHours: number
    countReportingIncident: number
    countRollingHours: number
    countRollingHoursEvent: number
    countRollingHoursExercise: number
    countRollingHoursIncident: number
    percReportingEvent: number
    percReportingExercise: number
    percReportingIncident: number
    percRollingEvent: number
    percRollingExercise: number
    percRollingIncident: number
    signedTandC: string | null
    teamAgreementSigned: string | null
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
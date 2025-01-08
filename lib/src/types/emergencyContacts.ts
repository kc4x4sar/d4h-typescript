
/** @ignore */
export interface EmergencyContact {
    name: string | null
    relation: string | null
    phone: string | null
    alt_phone: string | null
}

/** @ignore */
export interface EmergencyContacts {
    primary: EmergencyContact
    secondary: EmergencyContact
}
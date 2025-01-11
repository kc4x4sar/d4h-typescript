import { Entity } from '../entity'
import { resourceType } from './generic'

/** @ignore @inline */
export interface IncidentLocation {
    type: string;
    coordinates: [number, number];
}

/** @ignore @inline */
export interface WeatherInfo {
    symbol: string | null;
    symbolDate: string | null;
    temperature: number | null;
}

/** @ignore @inline */
export interface AddressInfo {
    postCode: string;
    region: string;
    street: string;
    town: string;
    country: string;
}
export interface Incident extends Entity{
    id: number;
    owner: resourceType;
    resourceType: string;
    reference: string;
    referenceDescription: string;
    bearing: number;
    coordinator: string | null;
    countAttendance: number;
    countGuests: number;
    createdAt: string;
    createdOrPublishedAt: string;
    description: string;
    descriptionDeprecated: string;
    distance: number;
    night: boolean;
    percAttendance: number;
    plan: string | null;
    planDeprecated: string | null;
    published: boolean;
    approved: boolean;
    shared: boolean;
    trackingNumber: string | null;
    updatedAt: string;
    startsAt: string;
    endsAt: string;
    weather: WeatherInfo;
    weatherPressure: number | null;
    weatherCloudCover: number | null;
    address: AddressInfo;
    location: IncidentLocation;
    locationBookmark: resourceType;
    fullTeam: boolean;
    selfCoordinator: boolean;
    tags: resourceType[];
}

import { Entity } from '../entity'

export interface IncidentOwner {
    resourceType: string;
    id: number;
}

export interface IncidentLocation {
    type: string;
    coordinates: [number, number];
}

export interface WeatherInfo {
    symbol: string | null;
    symbolDate: string | null;
    temperature: number | null;
}

export interface AddressInfo {
    postCode: string;
    region: string;
    street: string;
    town: string;
    country: string;
}

export interface IncidentLocationBookmark {
    id: number | null;
    resourceType: string;
}

export interface IncidentTag {
    id: number;
    resourceType: string;
}

export interface Incident extends Entity{
    id: number;
    owner: IncidentOwner;
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
    locationBookmark: IncidentLocationBookmark;
    fullTeam: boolean;
    selfCoordinator: boolean;
    tags: IncidentTag[];
}

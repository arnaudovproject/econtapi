import {Country} from "./Country";

interface Location {
    expressCityDeliveries: boolean,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean,
    serviceDays: number,
    zoneId: number,
    zoneName: string,
    zoneNameEn: string
}

export interface City {
    id: number,
    country: Country,
    location: Location,
}
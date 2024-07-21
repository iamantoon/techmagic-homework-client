import { Rental } from "./rental.model";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    jwt: string;
}

interface PersonalInfo {
    firstName: string;
    lastName: string;
    patronymic: string;
    city: string;
    country: string;
    address: string;
    phone: string;
    discount: number;
    rentCount: number;
}

export interface AccountInfo {
    user: PersonalInfo;
    activeRents: number;
    closedRents: number;
    lastRents: Rental[];
}
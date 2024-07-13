export interface User {
    id: string;
    firstName: string;
    lastName: string;
    jwt: string;
}

export interface Account {
    firstName: string;
    lastName: string;
    patronymic: string;
    country: string;
    city: string;
    address: string;
    phone: string;
    created: string;
}
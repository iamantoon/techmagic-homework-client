export interface Login {
    phone: string;
    password: string;
}

export interface Register {
    firstName: string;
    lastName: string;
    patronymic: string;
    dateOfBirth: Date;
    gender: 'male' | 'female';
    country: string;
    city: string;
    address: string;
    phone: string;
    password: string;
}
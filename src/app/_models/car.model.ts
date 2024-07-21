export interface Car {
    _id: string;
    brand: string;
    carModel: string;
    year: number;
    type: string;
    cost: number;
    discount?: number;
    rentCost: number;
    photoUrl?: string;
} 

export interface RentCar {
    userId: string;
    expectedReturnDate: number;
}

export interface ReturnCar {
    rentalId: string;
    userId: string;
    isDamaged: boolean;
}
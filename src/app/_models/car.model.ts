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
    expectedReturnDate: number;
}

export interface ReturnCar {
    rentalId: string;
    isDamaged: boolean;
}
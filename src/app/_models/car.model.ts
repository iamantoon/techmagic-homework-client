export interface Car {
    _id: string;
    brand: string;
    carModel: string;
    year: number;
    type: string;
    cost: number;
    rentCost: number;
    photoUrl?: string;
    discount?: number;
} 

export interface RentCar {
    expectedReturnDate: number;
}

export interface ReturnCar {
    rentalId: string;
    isDamaged: boolean;
}
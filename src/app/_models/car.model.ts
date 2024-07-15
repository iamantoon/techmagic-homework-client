export interface Car {
    _id: string;
    brand: string;
    carModel: string;
    year: number;
    type: string;
    cost: number;
    rentCost: number;
    photoUrl?: string;
} 

export interface RentCar {
    carId: string;
    userId: string;
    expectedReturnDate: number;
}

export interface ReturnCar {
    rentalId: string;
    carId: string;
    userId: string;
    isDamaged: boolean;
}
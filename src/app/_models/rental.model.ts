export interface Rental {
    _id: string;
    car: CarInfo;
    startDate: Date;
    expectedReturnDate: Date;
    finalRentalCost: number;
    status: string;
    discount: number;
    penalty: number;
}

export interface CarInfo {
    brand: string;
    carModel: string;
}
export interface Rental {
    _id: string;
    car: CarInfo;
    carId: string;
    startDate: Date;
    expectedReturnDate: Date;
    actualReturnDate: Date;
    finalRentalCost: number;
    status: string;
    discount: number;
    penalty: number;
}

export interface CarInfo {
    brand: string;
    carModel: string;
}
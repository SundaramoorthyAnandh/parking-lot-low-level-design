export enum VehicleType {
    MOTORCYCLE = 'MOTORCYCLE',
    CAR = 'CAR',
    BUS = 'BUS'
}

export class Vehicle {
    constructor(public licensePlate: string, public type: VehicleType) {}
}

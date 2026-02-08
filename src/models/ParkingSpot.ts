import { VehicleType } from './Vehicle';

export enum SpotStatus {
    FREE = 'FREE',
    OCCUPIED = 'OCCUPIED',
    RESERVED = 'RESERVED'
}

export class ParkingSpot {
    constructor(
        public id: string,
        public floorNumber: number,
        public spotNumber: number,
        public type: VehicleType,
        public status: SpotStatus = SpotStatus.FREE
    ) {}

    occupy(): void {
        this.status = SpotStatus.OCCUPIED;
    }

    vacate(): void {
        this.status = SpotStatus.FREE;
    }

    isFree(): boolean {
        return this.status === SpotStatus.FREE;
    }
}

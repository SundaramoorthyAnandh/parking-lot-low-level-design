import { Vehicle } from './Vehicle';
import { ParkingSpot } from './ParkingSpot';

export enum TicketStatus {
    ACTIVE = 'ACTIVE',
    PAID = 'PAID',
    LOST = 'LOST'
}

export class Ticket {
    id: string;
    entryTime: Date;
    exitTime: Date | null;
    status: TicketStatus;

    constructor(
        public vehicle: Vehicle,
        public assignedSpot: ParkingSpot
    ) {
        this.id = this.generateId();
        this.entryTime = new Date();
        this.exitTime = null;
        this.status = TicketStatus.ACTIVE;
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9).toUpperCase();
    }
}

import { ParkingFloor } from '../models/ParkingFloor';
import { Vehicle, VehicleType } from '../models/Vehicle';
import { Ticket, TicketStatus } from '../models/Ticket';
import { ParkingSpot, SpotStatus } from '../models/ParkingSpot';

export class ParkingLot {
    private static instance: ParkingLot;
    private floors: ParkingFloor[];
    private tickets: Map<string, Ticket>;

    private constructor() {
        this.floors = [];
        this.tickets = new Map();
        // Initialize with default configuration: 3 floors, 20 spots each
        for (let i = 0; i < 3; i++) {
            this.floors.push(new ParkingFloor(i, 20));
        }
    }

    public static getInstance(): ParkingLot {
        if (!ParkingLot.instance) {
            ParkingLot.instance = new ParkingLot();
        }
        return ParkingLot.instance;
    }

    public processEntry(vehicle: Vehicle): Ticket {
        // Find first available spot using Lowest Floor First Strategy
        let assignedSpot: ParkingSpot | null = null;
        for (const floor of this.floors) {
            assignedSpot = floor.getAvailableSpot(vehicle.type);
            if (assignedSpot) {
                break;
            }
        }

        if (!assignedSpot) {
            throw new Error('Parking Lot Full for this vehicle type.');
        }

        // Occupy the spot
        assignedSpot.occupy();

        // Create Ticket
        const ticket = new Ticket(vehicle, assignedSpot);
        this.tickets.set(ticket.id, ticket);

        return ticket;
    }

    public processExit(ticketId: string): Ticket {
        const ticket = this.tickets.get(ticketId);
        if (!ticket) {
            throw new Error('Invalid Ticket ID');
        }

        if (ticket.status !== TicketStatus.ACTIVE) {
            throw new Error('Ticket is not active (already paid or lost).');
        }

        // Calculate Fee (just for display, payment happens separately in a real system)
        // Here we just close the session
        ticket.exitTime = new Date();
        ticket.assignedSpot.vacate();
        ticket.status = TicketStatus.PAID;

        return ticket;
    }

    public getTicket(ticketId: string): Ticket | undefined {
        return this.tickets.get(ticketId);
    }
}

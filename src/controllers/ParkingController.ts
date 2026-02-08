import { Request, Response } from 'express';
import { ParkingLot } from '../services/ParkingLot';
import { PricingStrategy } from '../services/PricingStrategy';
import { Vehicle, VehicleType } from '../models/Vehicle';

export class ParkingController {
    static async entry(req: Request, res: Response) {
        try {
            const { licensePlate, vehicleType } = req.body;
            
            if (!licensePlate || !vehicleType) {
                return res.status(400).json({ error: 'License plate and vehicle type are required' });
            }

            const type = VehicleType[vehicleType as keyof typeof VehicleType];
            if (!type) {
                return res.status(400).json({ error: 'Invalid vehicle type' });
            }

            const vehicle = new Vehicle(licensePlate, type);
            const parkingLot = ParkingLot.getInstance();
            const ticket = parkingLot.processEntry(vehicle);

            return res.status(201).json({
                message: 'Entry successful',
                ticketId: ticket.id,
                spot: {
                    floor: ticket.assignedSpot.floorNumber,
                    number: ticket.assignedSpot.spotNumber
                },
                entryTime: ticket.entryTime
            });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async exit(req: Request, res: Response) {
        try {
            const { ticketId } = req.body;

            if (!ticketId) {
                return res.status(400).json({ error: 'Ticket ID is required' });
            }

            const parkingLot = ParkingLot.getInstance();
            const ticket = parkingLot.getTicket(ticketId);

            if (!ticket) {
                return res.status(404).json({ error: 'Ticket not found' });
            }

            // Calculate fee before processing exit (simulating payment step)
            // In a real scenario, this would be a separate /calculate-fee endpoint, then /pay, then /exit
            // For simplicity, we calculate fee and process exit in one go
            
            const fee = PricingStrategy.calculateFee(ticket);
            
            // Process exit (free up spot)
            parkingLot.processExit(ticketId);

            return res.status(200).json({
                message: 'Exit successful',
                ticketId: ticket.id,
                entryTime: ticket.entryTime,
                exitTime: ticket.exitTime,
                fee: fee
            });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

import { VehicleType } from '../models/Vehicle';
import { Ticket } from '../models/Ticket';

export class PricingStrategy {
    private static rates: { [key in VehicleType]: number } = {
        [VehicleType.MOTORCYCLE]: 10,
        [VehicleType.CAR]: 20,
        [VehicleType.BUS]: 50
    };

    static calculateFee(ticket: Ticket): number {
        const exitTime = new Date();
        const durationMs = exitTime.getTime() - ticket.entryTime.getTime();
        const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));
        
        // Minimum 1 hour charge
        const chargeableHours = Math.max(1, durationHours);
        
        return chargeableHours * this.rates[ticket.vehicle.type];
    }
}

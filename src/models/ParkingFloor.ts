import { ParkingSpot, SpotStatus } from './ParkingSpot';
import { VehicleType } from './Vehicle';

export class ParkingFloor {
    public spots: Map<string, ParkingSpot>;

    constructor(public floorNumber: number, numSpots: number) {
        this.spots = new Map();
        // Initialize spots for demo purposes
        // Allocating spots for different vehicle types:
        // 1-5: Motorcycle
        // 6-15: Car
        // 16-20: Bus
        for (let i = 1; i <= numSpots; i++) {
            let type = VehicleType.CAR;
            if (i <= 5) type = VehicleType.MOTORCYCLE;
            else if (i > 15) type = VehicleType.BUS;

            const spotId = `F${floorNumber}-S${i}`;
            this.spots.set(spotId, new ParkingSpot(spotId, floorNumber, i, type));
        }
    }

    getAvailableSpot(type: VehicleType): ParkingSpot | null {
        for (const spot of this.spots.values()) {
            if (spot.isFree() && spot.type === type) {
                return spot;
            }
        }
        return null;
    }
}

import { Ticket } from './Ticket';

export enum PaymentMethod {
    CASH = 'CASH',
    CREDIT_CARD = 'CREDIT_CARD',
    UPI = 'UPI'
}

export class Payment {
    id: string;
    timestamp: Date;

    constructor(
        public ticket: Ticket,
        public amount: number,
        public method: PaymentMethod
    ) {
        this.id = Math.random().toString(36).substr(2, 9).toUpperCase();
        this.timestamp = new Date();
    }
}

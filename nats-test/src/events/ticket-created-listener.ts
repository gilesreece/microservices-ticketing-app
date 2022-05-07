import {Message} from "node-nats-streaming";
import {Listener} from "./base-listener";

export class TicketCreatedListener extends Listener {
    subject = '';
    queueGroupName = 'payments-service';

    onMessage(data: any, msg: Message): void {
        console.log('Event data!', data);
        msg.ack();
    }
}
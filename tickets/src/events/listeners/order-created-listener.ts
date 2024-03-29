import {Listener, OrderCreatedEvent, Subjects} from "@gilesreece2/common";
import { queueGroupName } from "./queue-group-name";
import {Message} from "node-nats-streaming";
import {Ticket} from "../../models/ticket.model";
import {TicketUpdatedPublisher} from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    
    queueGroupName: string = queueGroupName;
    
    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id);
        
        if(!ticket) {
            throw new Error('Ticket not found');
        }
        
        ticket.set({ orderId: data.id});
        
        await ticket.save();
    
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version: ticket.version
        });
        
        msg.ack();
    }
    
}
import {OrderCancelledListener} from "../order-cancelled-listener";
import {natsWrapper} from "../../../nats-wrapper";
import mongoose, {set} from "mongoose";
import {Ticket} from "../../../models/ticket.model";
import {OrderCancelledEvent, OrderCreatedEvent} from "@gilesreece2/common";
import {Message} from "node-nats-streaming";

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);
    
    const orderId = new mongoose.Types.ObjectId().toHexString();
    
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        userId: 'asdas'
    });
    
    ticket.set({orderId});
    await ticket.save();
    
    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id
        }
    }
    
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }
    
    return { listener, data, msg, ticket, orderId}
}

it('updates the ticket, publishes an event and acks the message', async () => {
    const { msg, data, listener, ticket, orderId} = await setup();
    
    await listener.onMessage(data, msg);
    
    const updateTicket = await Ticket.findById(ticket.id);
    
    expect(updateTicket!.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
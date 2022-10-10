import {OrderCreatedListener} from "../order-created-listener";
import {natsWrapper} from "../../../nats-wrapper";
import {Ticket} from "../../../models/ticket.model";
import mongoose from "mongoose";
import {OrderCreatedEvent, OrderStatus} from "@gilesreece2/common";
import {Message} from "node-nats-streaming";

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);
    
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        userId: 'daasgsad'
    });
    
    await ticket.save();
    
    const data: OrderCreatedEvent['data'] = {
        status: OrderStatus.Created,
        ticket: { id: ticket.id, price: ticket.price },
        expiresAt: '1231nams',
        userId: "asajklsg",
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0
    }
    
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }
    
    return { listener, data, ticket, msg}
}

it('sets the userid of the ticket ', async () => {
    const { listener, ticket, data, msg} = await setup();
    
    await listener.onMessage(data, msg);
    
    const updatedTicket = await Ticket.findById(ticket.id);
    
    expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
    const { listener, data, msg} = await setup();
    
    await listener.onMessage(data, msg);
    
    expect(msg.ack).toHaveBeenCalled();
});

it('Publishes a ticket updated event', async () => {
    const { listener, ticket, data, msg } = await setup();
    
    await listener.onMessage(data, msg);
    
    expect(natsWrapper.client.publish).toHaveBeenCalled();
    
    const ticketUpdatedDate = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
    
    expect(data.id).toEqual(ticketUpdatedDate.orderId);
});
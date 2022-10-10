import {TicketUpdatedListener} from "../ticket-updated-listener";
import {natsWrapper} from "../../../nats-wrapper";
import {Ticket} from "../../../models/ticket";
import mongoose from "mongoose";
import {Message} from "node-nats-streaming";
import {TicketUpdatedEvent} from "@gilesreece2/common";
import exp from "constants";

const setup = async () => {
   const listener = new TicketUpdatedListener(natsWrapper.client);
   const ticket = Ticket.build({
       title: 'Title',
       id: new mongoose.Types.ObjectId().toHexString(),
       price: 20,
   })
   await ticket.save();
   
   const data: TicketUpdatedEvent['data'] = {
       title: 'New title',
       id: ticket.id,
       userId: new mongoose.Types.ObjectId().toHexString(),
       price: 40,
       version: ticket.version + 1
   }
   
   //@ts-ignore
   const msg: Message = {
       ack: jest.fn()
   }
   
   return { listener, data, msg, ticket}
};

it('finds, updates and saves a ticket', async () => {
    const { msg, data, ticket, listener} = await setup();
    
    await listener.onMessage(data, msg);
    
    const updatedTicket = await Ticket.findById(ticket.id);
    
    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const { msg, data, listener } = await setup();
    
    await listener.onMessage(data, msg);
    
    expect(msg.ack).toHaveBeenCalled();
});
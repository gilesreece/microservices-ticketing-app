import request from "supertest";
import {app} from "../../../app";
import {TicketCreatedListener} from "../ticket-created-listener";
import {natsWrapper} from "../../../nats-wrapper";
import {TicketCreatedEvent} from "@gilesreece2/common";
import mongoose, {set} from "mongoose";
import {Message} from "node-nats-streaming";
import {Ticket} from "../../../models/ticket";

const setup = async () => {
    const listener = new TicketCreatedListener(natsWrapper.client);
    
    const data: TicketCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 20,
        version: 0,
        title: 'Title',
        userId: new mongoose.Types.ObjectId().toHexString()
    }
    
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };
    
    return { listener, data, msg }
}

it('Creates and saves a ticket', async () => {
    const { listener, data, msg } = await setup();
    
    await listener.onMessage(data, msg);
    
    const ticket = await Ticket.findById(data.id);
    
    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title);
    expect(ticket!.price).toEqual(data.price);
});

it('acks the message', async () => {
    const { data, listener, msg } = await setup();
    
    await listener.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled();
});
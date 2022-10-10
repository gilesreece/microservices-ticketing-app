import {Ticket} from "../../models/ticket";
import request from "supertest";
import {app} from "../../app";
import {Order, OrderStatus} from "../../models/order";
import {natsWrapper} from "../../nats-wrapper";
import mongoose from "mongoose";

it('should set the status of an order to cancelled', async () => {
    
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });
    
    await ticket.save();
    
    const user = global.signin();
    
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id } )
        .expect(201);
    
    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);
    
    const updatedOrder = await Order.findById(order.id);
    
    
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
});

it('Should emit an event when order is cancelled', async () => {
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });
    
    await ticket.save();
    
    const user = global.signin();
    
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id } )
        .expect(201);
    
    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);
    
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
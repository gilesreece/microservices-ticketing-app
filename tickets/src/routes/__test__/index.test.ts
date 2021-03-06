import {Ticket} from "../../models/ticket.model";
import request from "supertest";
import {app} from "../../app";

const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'alsknda',
            price: 20
        });
}

it('should return all tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);

    expect(response.body.length).toEqual(3);
});
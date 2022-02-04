import {app} from "../../app";
import request from "supertest";

it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
});

it('it can only be accessed if the user is signed in', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401);
});

it('returns a status over than 401 if the user is signed in', async () => {
   const response = await request(app)
       .post('/api/tickets')
       .set('Cookie', global.signin())
       .send({});

   expect(response.status).not.toEqual(401);
});

it('it returns and error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10
        })
        .expect(400);
});

it('returns and error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'title',
            price: -10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'title',
        })
        .expect(400);
});

it('it creates a ticket with valid inputs', async () => {
    //@todo: add in a check to make sure the ticket was saved

    await request(app)
        .post('/api/tickets')
        .send({
            title: 'name',
            price: 20
        })
        .expect(201);
});

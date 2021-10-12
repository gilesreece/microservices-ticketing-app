import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose from 'mongoose';

import {signupRouter} from "./routes/signup";
import {currentUserRouter} from "./routes/current-user";
import {signinRouter} from "./routes/signin";
import {signoutRouter} from "./routes/signout";
import errorHandler from "./middleware/error-handler";
import {NotFoundError} from "./errors/not-found-error";

const app = express();
app.use(json());
app.use(signupRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})
app.use(errorHandler);

const start = async () => {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log("Connected to mongodb");
    app.listen(3000, () => {
        console.log('Listening on port: 3000');
    });
}

start().catch(err => {
    console.log(err);
});


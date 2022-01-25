import express from 'express';
import 'express-async-errors'
import {json} from 'body-parser'
import cookieSession from "cookie-session";

import {signupRouter} from "./routes/signup";
import {currentUserRouter} from "./routes/current-user";
import {signinRouter} from "./routes/signin";
import {signoutRouter} from "./routes/signout";
import errorHandler from "./middleware/error-handler";
import {NotFoundError} from "./errors/not-found-error";

const app = express();
app.set('trust proxy', true);
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
}));
app.use(json());
app.use(signupRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})
app.use(errorHandler);

export {app};
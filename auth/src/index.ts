import express from 'express';
import { json } from 'body-parser'
import {signupRouter} from "./routes/signup";
import {currentUserRouter} from "./routes/current-user";
import {signinRouter} from "./routes/signin";
import {signoutRouter} from "./routes/signout";

const app = express();
app.use(json());
app.use(signupRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.listen(3000, () => {
    console.log('Listening on port: 3000');
})
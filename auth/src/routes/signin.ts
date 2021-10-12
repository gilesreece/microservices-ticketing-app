import Router, {Request, Response} from 'express';
import {body} from "express-validator";

const router = Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({
            min: 4
        })
        .withMessage('Password must be greater than 4')],
    async (req: Request, res: Response) => {

    const {email, password} = req.body;

    res.send({});


});

export { router as signinRouter };


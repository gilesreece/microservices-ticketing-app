import jwt from 'jsonwebtoken';
import Router, { Request, Response, NextFunction} from 'express'
import {body} from 'express-validator';
import {User} from "../models/user.model";
import {BadRequestError, validateRequest} from "@gilesreece2/common";

const router = Router();

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({
                min: 4
            })
            .withMessage('Password must be greater than 4')],
    validateRequest,
    async (req: Request, res: Response) => {

        const { email, password } = req.body;

        const existingUser = await User.findOne({email})

        if(existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({email, password});
        await user.save();

        // Generate JWT store on the sessions object

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);

    }
);

export { router as signupRouter };
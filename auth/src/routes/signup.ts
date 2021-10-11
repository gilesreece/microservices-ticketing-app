import Router, { Request, Response, NextFunction} from 'express'
import {body, validationResult} from 'express-validator';

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
    (req: Request, res: Response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
    }

    const { email, password } = req.body;

    console.log("Creating user")

    res.send({});
});

export { router as signupRouter };
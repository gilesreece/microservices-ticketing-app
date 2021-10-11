import Router, {Request, Response} from 'express';

const router = Router();

router.get('/api/users/signout', (req: Request, res: Response) => {
    res.send({
       'message': 'Hi There'
    });
});

export { router as signoutRouter };


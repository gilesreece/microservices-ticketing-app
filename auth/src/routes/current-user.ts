import Router, {Request, Response} from 'express';

const router = Router();

router.get('/api/users/currentuser', (req: Request, res: Response) => {
    res.send({
       'message': 'Hi There'
    });
});

export { router as currentUserRouter };


import {Request, Response, NextFunction} from 'express';


const ErrorHandler = (req: Request, res: Response, next: NextFunction) => {

    if (res.statusCode === 400) {
        throw new RequestValidationError('Validation error on the body of the request.');
    }

}

export default ErrorHandler;
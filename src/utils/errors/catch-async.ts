import { Request, Response, NextFunction, RequestHandler } from 'express';
import { HandleErrorResponse } from './error-handlers';

const catchAsync = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => HandleErrorResponse(err, res));
};

export default catchAsync;
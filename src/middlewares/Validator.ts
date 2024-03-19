import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { ContextRunner } from 'express-validator/src/chain';
import { BadRequest } from '../utils/errors/error-handlers';

export const Validator = {
  validate: (validations: ContextRunner[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      await Promise.all(
        validations.map((validation: ContextRunner) => validation.run(req)),
      );

      const errors = validationResult(req);

      if (errors.isEmpty()) return next();

      return res.status(400).json(
        new BadRequest({
          data: errors.array().map(({ msg }) => ({
            message: msg,
          })),
        }),
      );
    };
  },
};
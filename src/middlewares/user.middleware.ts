import { NextFunction, Request, Response } from "express";
import userService from "../services/user-service";
import { HandleErrorResponse } from "../utils/errors/error-handlers";

export const userMiddlewares = {
  getUserByParamUserId: async(req: Request, res: Response, next: NextFunction, id: string) => {
    try {   
      const user = await userService.getUserByIdOrError(id)
      req.user = user;
      return next()
    } catch (error) {
      return HandleErrorResponse(error, res)
    }
  }
}
import { NextFunction, Request, Response } from "express";
import authService from "../services/auth-service";
import userService from "../services/user-service";
import { HandleErrorResponse, UnauthorizedAccess } from "../utils/errors/error-handlers";

export const authenticator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = <string>req.headers['authorization'];
    const { sub } = authService.verifyAuthToken(token);
    const user = await userService.getUserByIdOrError(sub!);
    req.user = user
    next();
  } catch (error) {
    HandleErrorResponse(new UnauthorizedAccess({ message: 'Invalid or missing token'}), res)
  }
}
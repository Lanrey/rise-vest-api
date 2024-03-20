import { Request, Response } from "express";
import catchAsync from "../utils/errors/catch-async";
import authService from "../services/auth-service";

export const authController = {
  getUserAuthToken: catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const token = await authService.getAuthToken(user.id);
    return res.status(201).json({ token });
  })
}
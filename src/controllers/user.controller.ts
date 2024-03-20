import { Request, Response } from "express";
import { CreateUserType } from "../interfaces/User";
import catchAsync from "../utils/errors/catch-async";
import userService from "../services/user-service";

export const userController = {
  createUser: catchAsync(async (req: Request, res: Response) => {
    const body = <CreateUserType>req.body;
    const user = await userService.createUser(body);
    return res.status(201).json(user);
  }),
  getUsers: catchAsync(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 20
    const users = await userService.getAllUsers({page, pageSize});
    return res.status(200).json({
      users
    })
  }),
  getUserById: catchAsync(async(req:Request, res: Response) => {
    const userId = <string>req.params.userId
    const user = await userService.getUserByIdOrError(userId)
    return res.status(200).json(user);
  }),
  getTopUsersWithLatestComment: catchAsync(async(req:Request, res: Response) => {
    const limit = <string>req.query['limit'] || '3'
    const topUsersWithLatestComment = await userService.getTopUsersWithLatestComment(limit)
    return res.status(200).json({ users: topUsersWithLatestComment });
  })
}
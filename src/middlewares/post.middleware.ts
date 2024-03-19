import { NextFunction, Request, Response } from "express";
import userService from "../services/user-service";
import { HandleErrorResponse } from "../utils/errors/error-handlers";
import postService from "../services/post.service";

export const postMiddlewares = {
  getPostByParamPostId: async(req: Request, res: Response, next: NextFunction, id: string) => {
    try {   
      const post = await postService.getPostByIdOrError(id)
      req.post = post;
      return next()
    } catch (error) {
      return HandleErrorResponse(error, res)
    }
  }
}
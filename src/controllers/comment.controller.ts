import { Request, Response } from "express";
import catchAsync from "../utils/errors/catch-async";
import commentService from "../services/comment.service";

export const commentController = {
  createComment: catchAsync(async (req: Request, res: Response) => {
    const { post, user, body: { content }} = req;
    const comment = await commentService.createComment({
      post, user, content
    })
    return res.status(200).json(comment);
  }),

  getPostComments: catchAsync(async (req: Request, res: Response) => {
    const postId = req.post.id;
    const comments = await commentService.getPostComments(postId);
    return res.status(200).json({post: req.post, comments })
  })

};
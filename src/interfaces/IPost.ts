import { Request } from "express";
import { User } from "../entities/user.entity";
import { Post } from "../entities/post.entity";

export type CreatePostType = {
  title: string;
  content: string;
  user: User;
};
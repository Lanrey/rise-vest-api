import { Post } from "./entities/post.entity";
import { User } from "./entities/user.entity";
declare module 'express-serve-static-core' {
  export interface Request {
    user: User,
    post: Post
  }
}
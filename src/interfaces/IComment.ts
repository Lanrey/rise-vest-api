import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";

export type CreateCommentType = {
  content: string;
  post: Post;
  user: User;
};
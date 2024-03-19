import { Repository } from "typeorm";
import handleGetRepository from "../utils/connection";
import { Comment } from "../entities/comment.entity";
import { CreateCommentType } from "../interfaces/IComment";

export class CommentService {
  constructor(private commentRepository: Repository<Comment>) {}
  /**
   * Creates a comment
   */
  async createComment({ user, post, content}: CreateCommentType): Promise<Comment> {
    const newComment = await this.commentRepository
      .create({
        user,
        post,
        content
      })
      .save();
    return newComment;
  }
  /**
   * Retrieves all comment of a post
   */
  async getPostComments(postId: number): Promise<Comment[]>  {
    const comments = await this.commentRepository.find({
      where: {
        post: {
          id: postId
        }
      },
      relations: ['user']
    });
    return comments
  }

}

export default new CommentService(handleGetRepository(Comment));
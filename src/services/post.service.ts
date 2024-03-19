import { Repository } from "typeorm";
import handleGetRepository from "../utils/connection";
import { Post } from "../entities/post.entity";
import { CreatePostType } from "../interfaces/IPost";
import { ResourceNotFoundError } from "../utils/errors/error-handlers";

export class PostService {
  constructor(private postRepository: Repository<Post>) {}
  /**
   * Creates a post
   */
  async createPost(data: CreatePostType): Promise<Post> {
    const post = await this.postRepository
      .create({
        user: data.user,
        title: data.title,
        content: data.content,
      })
      .save();
    return post;
  }
  /**
   * retrieve a user's posts
   */
  async getUserPosts(userId: number): Promise<Post[]> {
    const posts = await this.postRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    return posts;
  }
  async getPostById(id: string): Promise<Post|null> {
    const post = await this.postRepository.findOne({
      where: {
        id: Number(id)
      },
    });
    return post;
  }
  async getPostByIdOrError(id: string): Promise<Post> {
    const post = await this.getPostById(id);
    if (!post) {
      throw new ResourceNotFoundError({
        message: `Post with id: ${id} does not exist`,
      });
    }
    return post;
  }
}

export default new PostService(handleGetRepository(Post));
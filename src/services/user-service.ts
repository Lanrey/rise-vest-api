import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserType } from "../interfaces/User";
import {
  ConflictError,
  ResourceNotFoundError,
} from "../utils/errors/error-handlers";
import handleGetRepository from "../utils/connection";

interface PaginationOptions {
    page: number; // Page number, starting from 1
    pageSize: number; // Number of items per page
  }

export class UserService {
  constructor(private userRepository: Repository<User>) {}
  /**
   * Creates a user
   */
  async createUser(data: CreateUserType): Promise<User> {
    if (await this.doesUserExistByEmail(data.email)) {
      throw new ConflictError({ message: "User already exist." });
    }
    const user = await this.userRepository
      .create({ email: data.email, name: data.name })
      .save();

    return user;
  }
  /**
   * Checks if a user's record exist in DB and returns true
   */
  async doesUserExistByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return !!user;
  }
  /**
   * Retrieves all users in database
   */
  async getAllUsers({page, pageSize}: PaginationOptions): Promise<User[]> {
    
    const skippedItems = (page - 1) * pageSize;


    const users = await this.userRepository.find({
        take: pageSize,
        skip: skippedItems
    });
    return users;
  }

  /**
   * Retrieves user of an id.
   * @param userId
   * @returns
   */
  async getUserById(userId: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        id: Number(userId),
      },
    });
    return user;
  }
  /**
   * Retrieves user of an id. errors if user is not found
   * @param userId
   * @returns
   */
  async getUserByIdOrError(userId: string): Promise<User> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new ResourceNotFoundError({
        message: `User with id: ${userId} does not exist`,
      });
    }
    return user;
  }
  async getTopUsersWithLatestComment(limit: string) {
  const topUsersWithLatestComment = await this.userRepository.query(`WITH LatestComments AS (
    SELECT
        postId,
        MAX(createdAt) AS LatestCreatedAt
    FROM comments
    GROUP BY postId
),
UserPostCounts AS (
    SELECT
        userId,
        COUNT(id) AS PostCount
    FROM posts
    GROUP BY userId
)
SELECT
    u.id,
    u.name,
    p.title,
    c.content
FROM users u
JOIN UserPostCounts upc ON u.id = upc.userId
LEFT JOIN posts p ON u.id = p.userId
LEFT JOIN LatestComments lc ON p.id = lc.postId
LEFT JOIN comments c ON p.id = c.postId AND lc.LatestCreatedAt = c.createdAt
ORDER BY upc.PostCount DESC
LIMIT $1;
`
 , [limit]);
    return topUsersWithLatestComment
  } 
}

export default new UserService(handleGetRepository(User));
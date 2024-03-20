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
  const topUsersWithLatestComment = await this.userRepository.query(`WITH top_users AS (
    SELECT
        "userId",
        COUNT(*) AS post_count
    FROM
        "Posts"
    GROUP BY
        "userId"
    ORDER BY
        post_count DESC
    LIMIT $1
), latest_comments AS (
    SELECT
        DISTINCT ON (c."userId") c."userId",
        c.id AS "commentId",
        c."content" AS "comment",
        c."postId",
        c.created_at
    FROM
        "Comments" c
    JOIN
        top_users tu ON tu."userId" = c."userId"
    ORDER BY
        c."userId", c.created_at DESC
)
SELECT
    lc."userId",
    tu.post_count,
    lc."commentId",
    lc."comment",
    lc."postId",
    p."content" AS post,
    u."name"
FROM
    latest_comments lc
JOIN
    top_users tu ON lc."userId" = tu."userId"
LEFT JOIN
    "Posts" p ON lc."postId" = p.id
LEFT JOIN
    "Users" u ON lc."userId" = u.id
ORDER BY
    tu.post_count DESC
`, [limit]);
    return topUsersWithLatestComment
  } 
}

export default new UserService(handleGetRepository(User));
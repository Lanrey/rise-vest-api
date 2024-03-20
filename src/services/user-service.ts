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
  const topUsersWithLatestComment = await this.userRepository.query(`COUNT("Posts"."userId") post_count
  from 
    "Posts" 
  GROUP BY
    "Posts"."userId" 
  ORDER BY 
    post_count 
  DESC limit $1
) top_users
LEFT JOIN
  "Comments" c
ON 
  top_users."userId" = c."userId"
WHERE
  c.created_at = (
    SELECT
      MAX("Comments".created_at) AS max_date
    FROM
      "Comments"
    WHERE
      "Comments"."userId" = top_users."userId"
  )) f
  
LEFT JOIN
  "Posts" p
ON
  f."postId" = p.id
LEFT JOIN 
  "Users" u 
ON 
  f."userId" = u.id
ORDER BY
  f.post_count DESC
`
 , [limit]);
    return topUsersWithLatestComment
  } 
}

export default new UserService(handleGetRepository(User));
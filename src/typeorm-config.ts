import "reflect-metadata";
import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Post } from "./entities/post.entity";
import { Comment } from "./entities/comment.entity";


const isDev = process.env.NODE_ENV === "development";

const dataSource: DataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ User, Post, Comment ],
  synchronize: false,
  logging: isDev,
  migrationsRun: true,
  migrations: [__dirname + '/migrations/**/*.ts'],
  ssl: {
    rejectUnauthorized: false
  }
});

export default dataSource;
import "reflect-metadata";
import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Post } from "./entities/post.entity";
import { Comment } from "./entities/comment.entity";
import {CreatePostComments1710866881509  } from "./db/migrations/1710866881509-create-post-comments";


const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production"

const dataSource: DataSource = new DataSource({
  type: "postgres",
  //url: process.env.DB_URL,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ User, Post, Comment],
  synchronize: false,
  logging: isDev,
  migrationsRun: true,
  migrations: [CreatePostComments1710866881509],
  ssl: { rejectUnauthorized: false , ca: `-----BEGIN CERTIFICATE-----
  MIIEQTCCAqmgAwIBAgIUeL8hYQ1yU3OSHxXA0BElprW7YegwDQYJKoZIhvcNAQEM
  BQAwOjE4MDYGA1UEAwwvNTc1ZGY4NjktYjI3OS00ZWJjLWFlNzEtZDMxNDk3YjFh
  YTkxIFByb2plY3QgQ0EwHhcNMjQwMjE2MTIxNDQ1WhcNMzQwMjEzMTIxNDQ1WjA6
  MTgwNgYDVQQDDC81NzVkZjg2OS1iMjc5LTRlYmMtYWU3MS1kMzE0OTdiMWFhOTEg
  UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALRLLFgz
  0KwVAsjdu45bdslyEWjPGv0ZGHO9lqeeyJ6xMNkAw7sNl10aTcyLX7mFRocOPco5
  uCzoifV9jkYI9pOf+UQMRsPsSMdz14pqt671sqnZ+9ueg9FA5evzoU6SYVeRGol2
  /411O5iTZ3wclWH4jDV1wOmtJF1KVTs6JnPqOkdaBSobRihKNotAYt07HmR4kXca
  I/dMYjsmLdAy7cxERnT6eMNcvj6uBCOu/3dfoSywVNhhepx6rrBWzcpsnmK/YWtf
  PAhlqa/AkrPi/SuV7pQR6sCEklU+MmAOXnjxoQ4Gsd5aS0ZjOOouzwn1Nih/j53B
  c+ZZT9jgGjUPCJ7SrZDyuWr7UiLQUize+Qx/2SSZeB9fuTwxgh0rBuc2Ah5S3+kB
  1tRrIpDuqw9MfQeRLUHMHD635KfmZrRMmFvBZoQhaHLiRmQcWoQAF0rVmTKfpHt5
  L60y4UIdSrjBegvRAfPRfdvK8AnD66w9ufAZBjsk+LoJgOtJo9L/Au/GIwIDAQAB
  oz8wPTAdBgNVHQ4EFgQU3Z5sThxmYeEkW1JDCeI1F0XZ9H0wDwYDVR0TBAgwBgEB
  /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAEd1LiJjA13jA6NL
  PJC1th9EeEByMeu/DEaT0CGXXBxawiAb7gS6pDRevR7uoWP02D1JrQn1I/vwOjFQ
  eACKIEYfeWnW8ZUYw688M5ZC1ihjpsBg8MoWyAMjV9/lkxL3eruIvZJ5l7ayeTOK
  Wacx+EVunqHqCRKMbJalzpfK+rx0e0kr4UAJtsCpObJJzmp2tmpHw+5ZxvTNt4zJ
  KIfND89Qir1EoRu7MtfjhySy21Cx+e/83QkjTSr7YbfrwrdqCnOIxEKKgAA5+o3D
  FIMyOcXPg6ncCzyQuZ1jP6L94PnbJ+UYT3TFsUEcKQJZHl/arngFihp3dxkn7tIQ
  OPPB91UYJW5sURuFmCS6pxlfneiCdCnzuDBlMvEVejb7umeq1wUidnO5CdZOjfcs
  1uznGNNodYof5ZmtfO73/WzbNUMIpuW2X9XQRHxTUCekMpTEHCIwT514Nbk3AUxk
  1mgEq4YbIz8G9kpGNVQrEdqyqs5snZkffx5pLHLFNqQDGisAHA==
  -----END CERTIFICATE-----`},
});

export default dataSource;
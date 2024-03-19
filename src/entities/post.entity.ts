import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, BaseEntity, Index } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity('Posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200, nullable: false })
  title!: string;

  @Index('post_text_index')
  @Column('text', { nullable: true })
  content?: string;

  @ManyToOne(() => User, user => user.posts)
  user!: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments?: Comment[];

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt!: Date;
}
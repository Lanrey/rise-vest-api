import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, BaseEntity, Index } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity('Comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Post, post => post.comments)
  post!: Post;

  @ManyToOne(() => User, user => user.comments)
  user!: User;

  @Index('comment_text_index')
  @Column('text', { nullable: true })
  content?: string;


  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt!: Date;

}
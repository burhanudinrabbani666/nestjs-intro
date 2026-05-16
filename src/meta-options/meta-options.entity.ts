import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Posts } from '../posts/posts.entity';

@Entity()
export class MetaOptions {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'json',
        nullable: false,
    })
    metaValue!: string;

    @CreateDateColumn()
    createdDate?: Date;

    @UpdateDateColumn()
    updatedDate?: Date;

    @OneToOne(() => Posts, (post) => post.metaOptions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    post!: Posts;
}

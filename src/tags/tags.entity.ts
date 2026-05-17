import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Posts } from '../posts/posts.entity';

@Entity()
export class Tags {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    })
    name!: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    })
    slug!: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description?: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    schema?: string;

    @Column({
        type: 'varchar',
        length: 1024,
        nullable: true,
    })
    featuredImageUrl?: string;

    @ManyToMany(() => Posts, (posts) => posts.tags, {
        onDelete: 'CASCADE',
    })
    post?: Posts[];

    // https://typeorm.io/docs/help/decorator-reference/
    @CreateDateColumn()
    createdDate?: Date;

    @UpdateDateColumn()
    updatedDate?: Date;

    @DeleteDateColumn()
    deletedDate?: Date;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from '../posts/posts.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    firstName!: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    lastName!: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true,
    })
    email!: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    password!: string;

    @OneToMany(() => Posts, (post) => post.author)
    post?: Posts[];
}

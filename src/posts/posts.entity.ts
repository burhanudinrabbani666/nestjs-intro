import {
    Column,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { PostTypeEnum } from './dto/enums/postType.enum';
import { StatusEnum } from './dto/enums/status.enum';
import { MetaOptions } from '../meta-options/meta-options.entity';
import { User } from '../users/users.entity';

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 255,
    })
    title!: string;

    @Column({
        type: 'enum',
        enum: PostTypeEnum,
        default: PostTypeEnum.POST,
        nullable: false,
    })
    postType!: PostTypeEnum;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 255,
        unique: true,
    })
    slug!: string;

    @Column({
        type: 'enum',
        enum: StatusEnum,
        nullable: true,
        default: StatusEnum.DRAFT,
    })
    status!: StatusEnum;

    @Column({
        type: 'text',
        nullable: true,
    })
    content?: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    schema?: string;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 1000,
    })
    featuredImageUrl?: string;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    publishOn?: Date;

    @OneToOne(() => MetaOptions, (metaOptions) => metaOptions.post, {
        cascade: true,
        eager: true,
    })
    metaOptions?: MetaOptions;

    @ManyToOne(() => User, (user) => user.post, { eager: true })
    author!: User;

    // -----------------
    tags?: string[];
}

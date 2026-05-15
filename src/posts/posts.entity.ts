import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostTypeEnum } from './dto/enums/postType.enum';
import { StatusEnum } from './dto/enums/status.enum';
import { CreatePostMetaOptions } from './dto/create-post-metaoptions.dto';
import { Post } from '@nestjs/common';

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id!: number;

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

    // TODO:
    /** 
     * 
    @Column({
        type: 'simple-array',
        nullable: true,
    })
    tags?: string[];
    
    @Column({
        type: 'array',
        nullable: true,
    })
    metaOptions?: CreatePostMetaOptions[];
    */
}

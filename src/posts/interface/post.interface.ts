import { MetaOptions } from '../../meta-options/meta-options.entity';
import { Tags } from '../../tags/tags.entity';
import { PostTypeEnum } from '../dto/enums/postType.enum';
import { StatusEnum } from '../dto/enums/status.enum';

export interface Post {
    id?: number | undefined;
    title: string;
    postType: PostTypeEnum;
    slug: string;
    status: StatusEnum;
    content?: string | null;
    schema?: string | null;
    featuredImageUrl?: string | null;
    publishOn?: Date | null;
    metaOptions?: MetaOptions | null;
    tags?: Tags[] | null;
}

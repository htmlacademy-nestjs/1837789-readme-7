import { PostType, StorableEntity, LinkPost } from '@project/core';
import { PostEntity } from '../post.entity';

export class LinkPostEntity extends PostEntity implements StorableEntity<LinkPost> {
    public type: PostType.Quotation;
    public urlLink: string;
    public description: string;

    constructor(post: LinkPost) {
        super(post);
        this.populate(post);
        this.urlLink = post.urlLink;
        this.description = post.description;
    }

    public toPOJO(): LinkPost {
        return {
            ...super.toPOJO(),
            type: this.type,
            urlLink: this.urlLink,
            description: this.description
        }
    }
}

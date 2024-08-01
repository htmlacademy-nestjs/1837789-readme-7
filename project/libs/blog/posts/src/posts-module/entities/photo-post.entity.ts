import { PostType, StorableEntity, PhotoPost } from '@project/core';
import { PostEntity } from '../post.entity';

export class PhotoPostEntity extends PostEntity implements StorableEntity<PhotoPost> {
    public type: PostType.Photo;
    public photo: string;

    constructor(post: PhotoPost) {
        super(post);
        this.populate(post);
        this.photo = post.photo;
    }

    public toPOJO(): PhotoPost {
        return {
            ...super.toPOJO(),
            type: this.type,
            photo: this.photo
        }
    }
}

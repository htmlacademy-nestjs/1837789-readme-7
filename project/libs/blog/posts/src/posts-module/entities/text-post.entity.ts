import { PostType, StorableEntity, TextPost } from '@project/core';
import { PostEntity } from '../post.entity';

export class TextPostEntity extends PostEntity implements StorableEntity<TextPost> {
    public type: PostType.Text;
    public name: string;
    public annoncement: string;
    public text: string;

    constructor(post: TextPost) {
        super(post);
        this.populate(post);
        this.name = post.name;
        this.annoncement = post.annoncement;
        this.text = post.text;
    }

    public toPOJO(): TextPost {
        return {
            ...super.toPOJO(),
            type: this.type,
            name: this.name,
            annoncement: this.annoncement,
            text: this.text,
        }
    }
}

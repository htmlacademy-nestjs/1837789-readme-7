import { PostType, StorableEntity, VideoPost } from '@project/core';
import { PostEntity } from '../post.entity';

export class VideoPostEntity extends PostEntity implements StorableEntity<VideoPost> {
    public type: PostType.Video;
    public name: string;
    public urlVideo: string;

    constructor(post: VideoPost) {
        super(post);
        this.populate(post);
        this.name = post.name;
        this.urlVideo = post.urlVideo;
    }

    public toPOJO(): VideoPost {
        return {
            ...super.toPOJO(),
            type: this.type,
            name: this.name,
            urlVideo: this.urlVideo,
        }
    }
}

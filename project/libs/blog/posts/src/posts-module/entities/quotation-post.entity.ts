import { PostType, StorableEntity, QuotationPost } from '@project/core';
import { PostEntity } from '../post.entity';

export class QuotationPostEntity extends PostEntity implements StorableEntity<QuotationPost> {
    public type: PostType.Quotation;
    public textQuotation: string;
    public authorQuotation: string;

    constructor(post: QuotationPost) {
        super(post);
        this.populate(post);
        this.textQuotation = post.textQuotation;
        this.authorQuotation = post.authorQuotation;
    }

    public toPOJO(): QuotationPost {
        return {
            ...super.toPOJO(),
            type: this.type,
            textQuotation: this.textQuotation,
            authorQuotation: this.authorQuotation
        }
    }
}

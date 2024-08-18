import { compare, genSalt, hash } from 'bcrypt';
import { Entity } from '@project/core';
import { StorableEntity, AuthUser} from '@project/core';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public firstname: string;
  public lastname: string;
  public avatarUrl: string;
  public avatar?: string;
  public registrationDate: Date;
  public passwordHash: string;
  public subscribers: string[];

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (! user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.registrationDate = user.registrationDate || new Date();
    this.passwordHash = user.passwordHash;
    this.avatarUrl = user.avatarUrl;
    this.subscribers = user.subscribers ?? [];
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      avatarUrl: this.avatarUrl,
      subscribers: this.subscribers,
      registrationDate: this.registrationDate,
      passwordHash: this.passwordHash,
    }
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public setAvatar(avatar: string) {
    this.avatar = avatar;

    return this;
  }

  public updateSubscribers(userId: string) {
    if (this.subscribers.includes(userId)) {
      this.subscribers = this.subscribers.filter(subscriberId => subscriberId !== userId);
    } else {
      this.subscribers.push(userId);
    }

    return this;
  }
}

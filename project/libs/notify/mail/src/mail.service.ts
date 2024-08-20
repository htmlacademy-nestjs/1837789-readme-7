import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { CommonPost, Subscriber } from '@project/core';
import { NotifyConfig } from '@project/notify-config';
import { MailSubject } from './mail.constants';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  @Inject(NotifyConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof NotifyConfig>

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscriber.email,
      subject: MailSubject.AddSubscriber,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstname} ${subscriber.lastname}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNotifyAboutNewPosts(subscribers: Subscriber[], posts: CommonPost[]) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscribers.map(subscriber => subscriber.email),
      subject: MailSubject.NotifyAboutNewPosts,
      template: './new-posts-appeared',
      context: { posts }
    });
  }
}

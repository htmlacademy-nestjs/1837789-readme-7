import { IsEmail, IsNotEmpty } from 'class-validator';

import {
  SubscriberMessage
} from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: SubscriberMessage.EmailNotValid })
  public email: string;

  @IsNotEmpty({ message: SubscriberMessage.FirstNameIsEmpty })
  public firstname: string;

  @IsNotEmpty({ message: SubscriberMessage.UserIdIsEmpty })
  public lastname: string;
}

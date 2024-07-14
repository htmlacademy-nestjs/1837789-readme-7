import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks'
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Kotovsky'
  })
  @Expose()
  public lastname: string;

  @ApiProperty({
    description: 'Valid URL',
    example: 'https://15.design.htmlacademy.pro/static/avatar/4.jpg'
  })
  @Expose()
  public avatarUrl: string;
}

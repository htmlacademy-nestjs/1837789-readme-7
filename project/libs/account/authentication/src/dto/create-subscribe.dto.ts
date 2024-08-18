import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString, } from "class-validator";

export class CreateSubscribeDto {
  @ApiProperty({
    description: 'User entity id',
    example: '660eb9f25dac3408417b2da9'
  })
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  public userId?: string;
}

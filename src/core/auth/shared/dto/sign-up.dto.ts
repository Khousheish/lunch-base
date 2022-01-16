import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @MinLength(6)
  @MaxLength(16)
  @Matches(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, {
    message: 'Please enter a valid username!',
  })
  public username: string;

  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*/, {
    message: 'Please enter a strong password!',
  })
  public password: string;

  @ApiProperty()
  @MaxLength(16)
  public firstName: string;

  @ApiProperty()
  @MaxLength(16)
  public lastName: string;
}

import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ description: 'User e-mail' })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ description: 'User Full Name' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'User is Admin', default: false })
  @IsBoolean()
  admin: boolean
}

import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({ description: 'Post Title' })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({ description: 'Post Content' })
  @IsString()
  @IsOptional()
  content?: string

  @ApiProperty({ description: 'Author Email' })
  @IsEmail()
  authorEmail: string
}

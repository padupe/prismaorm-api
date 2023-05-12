// Usando PartialType do pacote Swagger, a documentação é preenchida automaticamente
import { PartialType } from '@nestjs/swagger'
import { CreatePostDto } from './create-post.dto'

export class UpdatePostDto extends PartialType(CreatePostDto) {}

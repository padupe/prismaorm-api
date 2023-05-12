// Usando PartialType do pacote Swagger, a documentação é preenchida automaticamente
import { PartialType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {}

import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

// O uso do & nos permite adicionar propriedades
export type PrismaClientError = PrismaClientKnownRequestError & {
  meta?: { target: string }
}

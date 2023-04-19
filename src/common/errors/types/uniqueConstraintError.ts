import { ConflictError } from './conflictError'
import { PrismaClientError } from './prismaClientError'

export class UniqueConstraintError extends ConflictError {
  constructor(error: PrismaClientError) {
    const uniqueField = error.meta.target
    super(`A record with this ${uniqueField} already exists!`)
  }
}

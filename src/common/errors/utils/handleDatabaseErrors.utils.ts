import { DatabaseError } from '../types/databaseError'
import { PrismaClientError } from '../types/prismaClientError'
import { UniqueConstraintError } from '../types/uniqueConstraintError'

enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
}

export const handleDatabaseErrors = (error: PrismaClientError): Error => {
  switch (error.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(error)
    default:
      return new DatabaseError(error.message)
  }
}

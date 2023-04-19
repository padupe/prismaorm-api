import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common'
import { Observable, catchError } from 'rxjs'
import { isPrismaError } from '../utils/isPrismaError'
import { handleDatabaseErrors } from '../utils/handleDatabaseErrors.utils'
import { DatabaseError } from '../types/databaseError'

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(error => {
        if (isPrismaError(error)) {
          error = handleDatabaseErrors(error)
        }

        if (error instanceof DatabaseError) {
          throw new BadRequestException(error.message)
        } else {
          throw error
        }
      }),
    )
  }
}

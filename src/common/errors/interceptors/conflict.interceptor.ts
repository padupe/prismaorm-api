import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common'
import { Observable, catchError } from 'rxjs'
import { ConflictError } from '../types/conflictError'

@Injectable()
export class ConflictInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof ConflictError) {
          throw new ConflictException(error.message)
        } else {
          throw error
        }
      }),
    )
  }
}

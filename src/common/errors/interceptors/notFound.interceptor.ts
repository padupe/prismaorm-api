import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common'
import { Observable, catchError } from 'rxjs'
import { NotFoundError } from '../types/notFoundError'

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof NotFoundError) {
          throw new NotFoundException(error.message)
        } else {
          throw error
        }
      }),
    )
  }
}

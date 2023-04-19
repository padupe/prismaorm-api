import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable, catchError } from 'rxjs'
import { isPrismaError } from '../utils/isPrismaError'
// import { DatabaseError } from '../types/databaseError'

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(error => {
        if (isPrismaError(error)) {
          //TODO
        }
        throw error
      }),
    )
  }
}

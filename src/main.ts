import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { UnauthorizedInterceptor } from './common/errors/interceptors/unauthorized.interceptor'
import { NotFoundInterceptor } from './common/errors/interceptors/notFound.interceptor'
import { ConflictInterceptor } from './common/errors/interceptors/conflict.interceptor'
import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  /**
   * DocumentBuilder é o método que nos permite configurar a documentação
   * Swagger, desde que as informações estejam de acordo com o padrão openapi.
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Simple Blog')
    .setDescription('The Simple Blog API')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('docs', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  // app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ConflictInterceptor())
  app.useGlobalInterceptors(new DatabaseInterceptor())
  app.useGlobalInterceptors(new UnauthorizedInterceptor())
  app.useGlobalInterceptors(new NotFoundInterceptor())
  await app.listen(process.env.PORT || 3000)
}
bootstrap()

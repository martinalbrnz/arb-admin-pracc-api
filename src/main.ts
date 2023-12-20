import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  
  const config = new DocumentBuilder()
  .setTitle('API')
  .setDescription('ARB Practice')
  .setVersion('1.0')
  .addTag('ARB')
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  
  await app.listen(process.env.PORT)
}

bootstrap()

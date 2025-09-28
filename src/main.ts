import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const openApiDoc = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Noma API')
      .setDescription('The Noma API escription')
      .setVersion('1.0')
      .addTag('noma')
      .build(),
  );
  SwaggerModule.setup(
    'api',
    app,
    openApiDoc,
  );
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

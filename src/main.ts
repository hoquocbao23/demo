import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const openApiDoc = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Noma API')
      .setDescription('The Noma API description')
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
}

bootstrap();

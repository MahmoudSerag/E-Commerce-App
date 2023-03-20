import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const config = new DocumentBuilder()
    .setTitle('E-Commerce App')
    .setDescription('E-Commerce APIs description')
    .setVersion('1.0')
    .addTag('APIs')
    .addServer('localhost:5000')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
  });
}
bootstrap();

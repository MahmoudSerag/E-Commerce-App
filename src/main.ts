import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });

  const config = new DocumentBuilder()
    .setTitle('E-Commerce App')
    .setDescription('E-Commerce APIs description')
    .setVersion('1.0')
    .addTag('APIs')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer(process.env.SERVER_DOMAIN)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = process.env.PORT || 5000;
  await app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
  });
}
bootstrap();

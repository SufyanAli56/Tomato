import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Enable CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:3000', // Next.js dev server
      'http://127.0.0.1:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = configService.get<number>('PORT') || 4000;
  await app.listen(port);

  console.log(`NestJS API is running on http://localhost:${port}`);
  console.log(`CORS enabled for frontend`);
}

bootstrap();

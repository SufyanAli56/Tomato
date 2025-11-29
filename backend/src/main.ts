// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // THIS FIXES THE FRONTEND ERROR
  app.enableCors({
    origin: [
      'http://localhost:3000',   // Next.js dev server
      'http://127.0.0.1:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT ?? 4000;
  await app.listen(port);

  console.log(`NestJS API is running on http://localhost:${port}`);
  console.log(`CORS enabled for frontend`);
}
bootstrap();
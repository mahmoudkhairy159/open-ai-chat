import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function start() {
  // Create an instance of the Nest application using the AppModule.
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || 3000;

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Specify the front-end URL
    credentials: true, // Enable reading cookies from the request
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    maxAge: 24 * 60 * 60 * 5, // Set the maximum age of preflight requests to 5 days
  };


  // Enable CORS with the specified options.
  app.enableCors(corsOptions);
  // Use global validation pipes for input validation.
  app.useGlobalPipes(new ValidationPipe());
  // Use the cookie-parser middleware to parse cookies from incoming requests.
  app.use(cookieParser());

  await app.listen(port, () =>
    console.log(`📢 Server starting on: http://localhost:${port}/ ⚡️`),
  );
}
start();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.FRONTEND_URL,
    ].filter(Boolean) as string[],
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;

  await app.listen(port, "0.0.0.0");

  console.log(`Server is Running on PORT: ${port}`);
}

bootstrap();
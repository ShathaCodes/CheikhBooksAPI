import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  console.log(process.env.DB_USER);
  app.use(morgan('dev'));
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();

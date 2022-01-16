import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { OrdersModule } from './orders/orders.module';
import { ScoresModule } from './scores/scores.module';
import { AddressesModule } from './addresses/addresses.module';
import { RatingsModule } from './ratings/ratings.module';
import { ReviewsModule } from './reviews/reviews.module';
import { GenresModule } from './genres/genres.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: 'root',
        password: process.env.DB_PASSWORD,
        database: "cheikhbooks",
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }
    ),
    UsersModule,
    BooksModule,
    OrdersModule,
    GenresModule,
    ScoresModule,
    AddressesModule,
    RatingsModule,
    ReviewsModule,
    AuthModule,
    MulterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

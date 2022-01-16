import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

import * as faker from "faker"
import { AddressesService } from "src/addresses/addresses.service";
import { Address } from "src/addresses/entities/address.entity";
import { BooksService } from "src/books/books.service";
import { Book } from "src/books/entities/book.entity";
import { Genre } from "src/genres/entities/genre.entity";
import { GenresService } from "src/genres/genres.service";
import { Score } from "src/scores/entities/score.entity";
import { ScoresService } from "src/scores/scores.service";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  console.log('in seed File');
  // application logic...

  // Todo : Seed Address
  const addressesService = app.get(AddressesService);
  console.log('seeding addresses');

  for (let i = 1; i < 10; i++) {
    const address = new Address();
    address.city = faker.address.city();
    address.address = faker.address.cardinalDirection();
    address.code = parseInt(faker.address.zipCode());

    await addressesService.create(address);
  }
  console.log('end seeding addresses');

  // Todo : Seed User
  const userService = app.get(UsersService);
  console.log('seeding users');
  const addresses = await addressesService.findAll({});
  for (let i = 1; i < 10; i++) {
    const user = new User();
    user.email = faker.internet.email();
    user.firstname = faker.name.firstName();
    user.lastname = faker.name.lastName();
    user.phone = parseInt(faker.phone.phoneNumber());
    user.birthday = faker.date.past();
    user.avatar = faker.image.avatar();
    user.adreesses = [];
    user.adreesses.push(addresses[i]);
    user.score = new Score();
    user.password = i % 3 == 0 ? 'admin' : 'user';
    await userService.create(user);
  }
  console.log('end seeding users');



  // Todo : Seed Genre
  const genreService = app.get(GenresService);
  console.log('seeding genres');
  const names = ["Textbooks", "Science", "History", "Biograph", "Adventure", "Fantasy"]
  for (let i = 1; i < 6; i++) {
    const genre = new Genre();
    genre.name = names[i];
    await genreService.create(genre);
  }
  console.log('end seeding genres');

  // Todo : Seed Book
  const bookService = app.get(BooksService);
  console.log('seeding books');
  const genres = await genreService.findAll({});
  for (let i = 1; i < 10; i++) {
    const book = new Book();
    book.title = faker.lorem.words();
    book.author = faker.name.findName();
    book.isValid = true;
    book.image = faker.image.abstract();
    book.price = parseFloat(faker.commerce.price());
    book.description = faker.lorem.sentence();
    book.genres = [];
    book.genres.push(genres[faker.datatype.number(6)]);
    await bookService.create(book);
  }
  const user = await userService.findOne(1);
  const book = new Book();
  book.title = faker.lorem.words();
  book.author = faker.name.findName();
  book.isValid = true;
  book.image = faker.image.abstract();
  book.price = parseFloat(faker.commerce.price());
  book.description = faker.lorem.sentence();
  book.genres = [];
  book.genres.push(genres[faker.datatype.number(6)]);
  book.user = user;
  await bookService.create(book);
  console.log('end seeding books');

  await app.close();
}
bootstrap();
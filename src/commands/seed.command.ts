import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import * as bcrypt from 'bcrypt';
import * as faker from "faker"
import { AddressesService } from "src/addresses/addresses.service";
import { Address } from "src/addresses/entities/address.entity";
import { BooksService } from "src/books/books.service";
import { Book } from "src/books/entities/book.entity";
import { Genre } from "src/genres/entities/genre.entity";
import { GenresService } from "src/genres/genres.service";
import { Score } from "src/scores/entities/score.entity";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { RatingsService } from 'src/ratings/ratings.service';
import { Rating } from 'src/ratings/entities/rating.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { ReviewsService } from 'src/reviews/reviews.service';
import { OrdersService } from 'src/orders/orders.service';
import { Order } from 'src/orders/entities/order.entity';

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
    user.phone = faker.datatype.number({ 'min': 10000000, 'max': 99999999 })
    user.birthday = faker.date.past();
    user.avatar = faker.image.avatar();
    user.adreesses = [];
    user.adreesses.push(addresses[i - 1]);
    user.score = new Score();
    let password = i % 3 == 0 ? 'admin' : 'user';
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await userService.create(user);
  }
  console.log('end seeding users');



  // Todo : Seed Genre
  const genreService = app.get(GenresService);
  console.log('seeding genres');
  const names = ["Novel", "Science", "History", "Biography", "Adventure", "Fantasy"]
  for (let i = 0; i < 6; i++) {
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
    book.language = "English";
    book.nbrPages = faker.datatype.number(1100);
    book.genres = [];
    book.genres.push(genres[faker.datatype.number(6)]);
    await bookService.create(book);
  }
  //book added by a user
  const user = await userService.findOne(1, {});
  const book = new Book();
  book.title = faker.lorem.words();
  book.author = faker.name.findName();
  book.isValid = true;
  book.image = faker.image.abstract();
  book.price = parseFloat(faker.commerce.price());
  book.description = faker.lorem.sentence();
  book.language = "English";
  book.nbrPages = faker.datatype.number(1100);
  book.genres = [];
  book.genres.push(genres[faker.datatype.number(6)]);
  book.user = user;
  await bookService.create(book);
  console.log('end seeding books');

  // Todo : Seed Ratings
  const ratingService = app.get(RatingsService);
  console.log('seeding ratings');
  const users = await userService.findAll({});
  const books = await bookService.findAll({});
  for (let i = 1; i < 16; i++) {
    const rating = new Rating();
    rating.score = faker.datatype.number(5)
    rating.book = books[faker.datatype.number(9)];
    rating.user = users[i%8];
    await ratingService.create(rating);
  }
  console.log('end seeding ratings');

  // Todo : Seed Reviews
  const reviewService = app.get(ReviewsService);
  console.log('seeding reviews');
  for (let i = 1; i < 8; i++) {
    const review = new Review();
    review.content = faker.lorem.sentence();
    review.book = books[i];
    review.user = users[i]
    await reviewService.create(review);
  }
  console.log('end seeding reviews');

  // Todo : Seed Orders
  const orderService = app.get(OrdersService);
  console.log('seeding orders');
  for (let i = 0; i < 6; i++) {
    const order = new Order();
    order.user = users[i]
    order.books = []
    order.books.push(books[i])
    order.shipped = false
    order.total = books[i].price
    order.date = new Date()
    await orderService.create(order);
  }
  console.log('end seeding orders');

  await app.close();
}
bootstrap();
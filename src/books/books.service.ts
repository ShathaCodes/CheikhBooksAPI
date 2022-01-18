import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generics/services/crud.service';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService extends CrudService<Book> {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {
    super(bookRepository);
  }

  findAllSearch(genre: string): Promise<any[]> {
    const query = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect(
        'book.genres',
        'genre')
      .where("book.isValid = 1");
    if (genre) {
      query.andWhere('genre.id = :id', { id: genre })
    }
    return query.getMany();
  }
}

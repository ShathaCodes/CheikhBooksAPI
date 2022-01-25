import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/generics/services/crud.service';
import { Brackets, QueryBuilder, Repository } from 'typeorm';
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

  findAllSearch(genre: Array<String>): Promise<any[]> {
    console.log(genre)
    const query = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect(
        'book.genres',
        'genre')
      .where("book.isValid = 1")
      .andWhere(new Brackets(qb => {
        let i = 0;
        while (genre.length > 0) {
          const g = genre.pop();
          let param = {}
          param["id" + i] = g
          if (i === 0)
            qb.where('genre.id = :id' + i, param);
          else
            qb.orWhere('genre.id = :id' + i, param);
          i++;
        }
      }));
    return query.getMany();
  }

  search(name: string, genre): Promise<any[]> {
    const query = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect(
        'book.genres',
        'genre')
      .where("book.isValid = 1");
    if (name) {
      query.andWhere(new Brackets((qb) => {
        qb.where("book.title like :name", { name: `%${name}%` })
          .orWhere("book.author like :name", { name: `%${name}%` })
      }))
    }
    if (genre) {
      let genres = genre.split(",")
      query.andWhere(new Brackets(qb => {
        let i = 0;
        while (genres.length > 0) {
          const g = genres.pop();
          let param = {}
          param["id" + i] = g
          if (i === 0)
            qb.where('genre.id = :id' + i, param);
          else
            qb.orWhere('genre.id = :id' + i, param);
          i++;
        }
      }));
    }
    return query.getMany();
  }

  findPopular(): Promise<any[]> {
    const query = this.bookRepository
      .createQueryBuilder('book')
      .innerJoin(
        'book.ratings',
        'rating')
      .addSelect("AVG(rating.score) as score")
      .orderBy('score', "DESC")
      .groupBy("book.id");
    return query.getMany();
  }
}

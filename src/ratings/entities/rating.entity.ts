import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';


@Entity('rating')
export class Rating extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    score: number;

    @ManyToOne(() => User, (user: User) => user.ratings)
    user: User;

    @ManyToOne(() => Book, (book: Book) => book.ratings)
    book: Book;

}

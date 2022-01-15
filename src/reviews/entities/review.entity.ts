import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';


@Entity('review')
export class Review extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    content: string;

    @Column()
    likes: number;

    @ManyToOne(() => User, (user: User) => user.reviews)
    user: User;

    @ManyToOne(() => Book, (book: Book) => book.reviews)
    book: Book;

}


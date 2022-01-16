import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';


@Entity('review')
export class Review extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @IsNotEmpty()
    @Column()
    content: string;

    @Type((newType) => Number)
    @Column({default : 0 })
    likes: number;

    @ManyToOne(() => User, (user: User) => user.reviews)
    user: User;

    @ManyToOne(() => Book, (book: Book) => book.reviews)
    book: Book;

}


import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';


@Entity('order')
export class Order extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsDate()
    @Type((newType) => Date)
    @Column()
    date: Date;

    @Column()
    shipped: Boolean;

    @Type((newType) => Number)
    @Column()
    total: number;

    @ManyToOne(() => User, (user: User) => user.orders)
    user: User;

    @ManyToMany(type => Book,(book: Book) => book.orders)
    books: Book[];
}

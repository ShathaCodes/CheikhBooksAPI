import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';


@Entity('genre')
export class Genre extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;


    @ManyToMany(type => Book)
    books : Book[]; 

}


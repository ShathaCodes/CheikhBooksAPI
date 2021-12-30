import { Column, Entity, Long, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';

@Entity('book')
export class Book extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    author: string;
  
    @Column()
    description: string;
  
    @Column()
    image: string;
  
    @Column()
    isValid: Boolean;
  
    @Column()
    language: string;
  
    @Column()
    nbrPages: number;

    @Column()
    price: number;

    @Column()
    type: string;
  
}

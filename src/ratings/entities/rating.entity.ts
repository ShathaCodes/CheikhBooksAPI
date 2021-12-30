import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';


@Entity('rating')
export class Rating extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    score: number;

}

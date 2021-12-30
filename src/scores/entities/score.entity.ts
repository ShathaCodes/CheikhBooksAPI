import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';


@Entity('score')
export class Score extends TimeStampEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    value: number;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';


@Entity('genre')
export class Genre extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

}


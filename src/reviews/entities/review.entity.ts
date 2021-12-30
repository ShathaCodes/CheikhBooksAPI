import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';


@Entity('review')
export class Review extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    content: string;

    @Column()
    likes: number;

}


import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';


@Entity('address')
export class Address extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    code: number;

}

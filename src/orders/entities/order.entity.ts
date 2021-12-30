import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';


@Entity('order')
export class Order extends TimeStampEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    date: Date;

    @Column()
    shipped: Boolean;

    @Column()
    total: number;

}

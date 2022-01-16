import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';


@Entity('address')
export class Address extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    city: string;

    @Type((newType) => Number)
    @Column()
    code: number;

    @ManyToOne(() => User, (user: User) => user.adreesses)
    user: User;


}

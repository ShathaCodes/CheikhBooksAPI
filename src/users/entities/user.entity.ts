import { Address } from 'src/addresses/entities/address.entity';
import { Book } from 'src/books/entities/book.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Rating } from 'src/ratings/entities/rating.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Score } from 'src/scores/entities/score.entity';
import { Column, Entity, JoinColumn, Long, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';

export enum UserRoleEnum {
  admin = 'admin',
  user = 'user',
}

@Entity('user')
export class User extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  birthday: Date;

  @Column()
  phone: number;


  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.user,
  })
  role: UserRoleEnum;

  @OneToMany((targetEntity) => Address, (address) => address.user, {})
  adreesses: Address[];

  @OneToOne(type => Score,{ cascade: ['insert', 'update'] })
  @JoinColumn()
  score: Score;

  @OneToMany((targetEntity) => Rating, (rating) => rating.user, {})
  ratings: Rating[];

  @OneToMany((targetEntity) => Review, (review) => review.user, {})
  reviews: Review[];

  @OneToMany((targetEntity) => Order, (order) => order.user, {})
  orders: Order[];

  @OneToMany((targetEntity) => Book, (book) => book.user, {})
  books: Book[];


}
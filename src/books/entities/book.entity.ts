import { Type } from 'class-transformer';
import { Genre } from 'src/genres/entities/genre.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Rating } from 'src/ratings/entities/rating.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinTable, Long, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

    @Column({default:0})
    isValid: Boolean;

    @Column()
    language: string;

    @Type((newType) => Number)
    @Column()
    nbrPages: number;

    @Type((newType) => Number)
    @Column()
    price: Number;

    @Column({default:"paperback"})
    type: string;

    @ManyToOne(() => User, (user: User) => user.books)
    user: User;

    @ManyToMany(type => Genre,(genre:Genre) => genre.books)
    @JoinTable({
        name: "book_genres", // nom de la table à générer
        joinColumn: {
            name: "book", // nom du champ représentant l’entité actuelle
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "genre", // nom du champ représentant l’entité en relation avec cet entité
            referencedColumnName: "id"
        }
    })
    genres: Genre[];

    @ManyToMany(type => Order,(order:Order)=> order.books)
    @JoinTable({
        name: "book_orders", // nom de la table à générer
        joinColumn: {
            name: "book", // nom du champ représentant l’entité actuelle
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "order", // nom du champ représentant l’entité en relation avec cet entité
            referencedColumnName: "id"
        }
    })
    orders: Order[];

    @OneToMany((targetEntity) => Review, (review) => review.book, {})
    reviews: Review[];

    @OneToMany((targetEntity) => Rating, (rating) => rating.book, {})
    ratings: Rating[];

}

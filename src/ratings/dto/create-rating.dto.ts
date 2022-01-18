import { User } from "src/users/entities/user.entity";

export class CreateRatingDto {

    score: number;
    user: User;

    book;
}

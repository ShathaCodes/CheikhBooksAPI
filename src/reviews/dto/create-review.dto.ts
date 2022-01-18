import { Type } from "class-transformer";
import { User } from "src/users/entities/user.entity";

export class CreateReviewDto {
    content: string;

    @Type((newType) => Number)
    likes: number;

    user: User;
    
    book;
}

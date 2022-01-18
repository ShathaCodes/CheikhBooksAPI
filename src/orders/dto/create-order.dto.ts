import { Type } from "class-transformer";
import { User } from "src/users/entities/user.entity";

export class CreateOrderDto {
    date: Date;
    
    shipped: Boolean;

    @Type((newType) => Number)
    total: number;
    
    user: User;
}

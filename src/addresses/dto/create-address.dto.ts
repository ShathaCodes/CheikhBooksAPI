import { Type } from "class-transformer";
import { User } from "src/users/entities/user.entity";

export class CreateAddressDto {

    address: string;
    city: string;

    @Type((newType) => Number)
    code: number;

    user: User;

}

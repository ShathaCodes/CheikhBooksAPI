import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export enum UserRoleEnum {
    admin = 'admin',
    user = 'user',
}

export class CreateUserDto {

    firstname: string;

    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password: string;

    avatar: string;
    
    @IsOptional()
    @IsDate()
    @Type((newType) => Date)
    birthday: Date;

    phone: number;

    role: UserRoleEnum;

}

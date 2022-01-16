export enum UserRoleEnum {
    admin = 'admin',
    user = 'user',
}

export class CreateUserDto {

    firstname: string;

    lastname: string;

    email: string;

    password: string;

    avatar: string;

    birthday: Date;

    phone: number;

    role: UserRoleEnum;

}

import { Type } from "class-transformer";

export class CreateBookDto {

    title: string;

    author: string;

    description: string;

    image: string;

    isValid: Boolean;

    language: string;

    @Type((newType) => Number)
    nbrPages: number;

    @Type((newType) => Number)
    price: Number;

    type: string;

}

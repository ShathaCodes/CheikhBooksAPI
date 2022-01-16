import { UserRoleEnum } from "src/users/entities/user.entity";

export class PayloadDto {
  email: string;
  role: UserRoleEnum;
}

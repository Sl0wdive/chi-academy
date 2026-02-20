import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
  @IsNotEmpty()
  user!: string;

  @IsEmail()
  email!: string;
}

import {
  JsonController,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpError,
} from "routing-controllers";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserDto } from "../dto/UserDto";

@JsonController()
export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  @Get("/")
  getAuthor() {
    return { author: "Vladyslav Hobona" };
  }

  @Get("/users")
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @Post("/users")
  async createUser(
    @Body({ validate: true }) body: UserDto,
  ): Promise<User> {
    const emailExists = await this.userRepository.findOne({
      where: { email: body.email.toLowerCase() },
    });

    if (emailExists) {
      throw new HttpError(409, "Email already in use");
    }

    const newUser = this.userRepository.create({
      user: body.user,
      email: body.email.toLowerCase(),
    });

    return await this.userRepository.save(newUser);
  }

  @Patch("/users/:id")
  async updateUser(
    @Param("id") id: string,
    @Body({ validate: true }) body: UserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const emailExists = await this.userRepository.findOne({
      where: { email: body.email.toLowerCase() },
    });

    if (emailExists && emailExists.id !== id) {
      throw new HttpError(409, "Email already in use");
    }

    user.user = body.user;
    user.email = body.email.toLowerCase();

    return await this.userRepository.save(user);
  }

  @Delete("/users/:id")
  async deleteUser(@Param("id") id: string) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpError(404, "User not found");
    }

    return { message: "User deleted" };
  }
}
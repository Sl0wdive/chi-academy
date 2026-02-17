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
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { UserDto } from "../dto/UserDto";

interface User {
  id: string;
  user: string;
  email: string;
}

const filePath = path.join(__dirname, "../data/users.json");

const readUsers = (): User[] => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const writeUsers = (users: User[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

@JsonController()
export class UserController {
  @Get("/")
  getAuthor() {
    return { author: "Vladyslav Hobona" };
  }

  @Get("/users")
  getUsers(): User[] {
    return readUsers();
  }

  @Post("/users")
  createUser(@Body({ validate: true }) body: UserDto): User {
    const users = readUsers();

    const emailExists = users.some(
      (u) => u.email.toLowerCase() === body.email.toLowerCase(),
    );

    if (emailExists) {
      throw new HttpError(409, "Email already in use");
    }

    const newUser: User = {
      id: uuidv4(),
      ...body,
    };

    users.push(newUser);
    writeUsers(users);

    return newUser;
  }

  @Patch("/users/:id")
  updateUser(
    @Param("id") id: string,
    @Body({ validate: true }) body: UserDto,
  ): User | { message: string } {
    const users = readUsers();
    const index = users.findIndex((u) => u.id === id);

    const emailExists = users.some(
      (u) => u.email.toLowerCase() === body.email.toLowerCase(),
    );

    if (emailExists) {
      throw new HttpError(409, "Email already in use");
    }

    if (index === -1) {
      return { message: "User not found" };
    }

    users[index] = {
      ...users[index],
      ...body,
      id: users[index]!.id,
    };

    writeUsers(users);

    return users[index];
  }

  @Delete("/users/:id")
  deleteUser(@Param("id") id: string) {
    const users = readUsers();
    const filtered = users.filter((u) => u.id !== id);

    if (filtered.length === users.length) {
      return { message: "User not found" };
    }

    writeUsers(filtered);

    return { message: "User deleted" };
  }
}

import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { User } from "./types/User.js";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;
const usersFilePath = path.join(__dirname, "data/users.json");

app.use(express.json());

const readUsers = (): User[] => {
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data) as User[];
};

const writeUsers = (users: User[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

app.get("/", (_: Request, res: Response) => {
  res.json({ author: "Vladyslav Hobona" });
});

app.get("/users", (_: Request, res: Response) => {
  res.json(readUsers());
});

app.post("/users", (req: Request, res: Response) => {
  const { user, email } = req.body;

  if (!user || !email) {
    return res.status(400).json({ message: "user and email required" });
  }

  const users = readUsers();

  const emailExists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (emailExists) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const newUser: User = {
    id: uuidv4(),
    user,
    email,
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json(newUser);
});

app.patch("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { user, email } = req.body;

  const users = readUsers();
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const emailExists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (emailExists) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const currentUser = users[index]!;
  users[index] = {
    ...currentUser,
    id: currentUser.id,
    user: user ?? currentUser.user,
    email: email ?? currentUser.email,
  };

  writeUsers(users);

  res.json(users[index]);
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const users = readUsers();
  const filtered = users.filter((u) => u.id !== id);

  if (filtered.length === users.length) {
    return res.status(404).json({ message: "User not found" });
  }

  writeUsers(filtered);

  res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
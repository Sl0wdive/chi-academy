import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

const app = express();
const PORT = 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    const userRepository = AppDataSource.getRepository(User);

    app.get("/", (_: Request, res: Response) => {
      res.json({ author: "Vladyslav Hobona" });
    });

    app.get("/users", async (_: Request, res: Response) => {
      const users = await userRepository.find();
      res.json(users);
    });

    app.post("/users", async (req: Request, res: Response) => {
      const { user, email } = req.body;

      if (!user || !email) {
        return res.status(400).json({ message: "user and email required" });
      }

      const existing = await userRepository.findOne({
        where: { email },
      });

      if (existing) {
        return res.status(409).json({ message: "Email already in use" });
      }

      const newUser = userRepository.create({ user, email });

      await userRepository.save(newUser);

      res.status(201).json(newUser);
    });

    app.patch("/users/:id", async (req: Request, res: Response) => {
      const { id } = req.params;
      const { user, email } = req.body;

      const existingUser = await userRepository.findOne({
        where: { id  } as any,
      });

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      if (email) {
        const emailTaken = await userRepository.findOne({
          where: { email },
        });

        if (emailTaken && emailTaken.id !== id) {
          return res.status(409).json({ message: "Email already in use" });
        }
      }

      existingUser.user = user ?? existingUser.user;
      existingUser.email = email ?? existingUser.email;

      await userRepository.save(existingUser);

      res.json(existingUser);
    });

    app.delete("/users/:id", async (req: Request, res: Response) => {
      const { id } = req.params;

      const result = await userRepository.delete(id as any);

      if (result.affected === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted" });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

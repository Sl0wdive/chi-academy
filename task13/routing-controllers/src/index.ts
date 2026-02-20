import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/UserController";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    const app = createExpressServer({
      controllers: [UserController],
      validation: true,
      defaultErrorHandler: false,
    });

    app.use((err: any, _req: any, res: any, _next: any) => {
      res.status(err.httpCode || 500).json({
        name: err.name,
        message: err.message,
      });
    });

    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((error) => console.log("DB Error:", error));

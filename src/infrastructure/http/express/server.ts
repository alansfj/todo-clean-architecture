import express from "express";
import { envs } from "../../../adapters/envs";
import { AppRouter } from "./app.routes";

export class Server {
  public static start() {
    const app = express();

    app.use(express.json());

    app.use(AppRouter.routes);

    const port = envs.PORT;

    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  }
}

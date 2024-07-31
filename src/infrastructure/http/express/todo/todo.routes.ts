import { Request, Response, Router } from "express";

export class TodoRouter {
  static get routes(): Router {
    const router = Router();

    router.get("/", (req: Request, res: Response) => {
      res.json("placeholder");
    });

    return router;
  }
}

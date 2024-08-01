import { Request, Response, Router } from "express";
import { TodoController } from "./todo.controller";
import { TodoService } from "../../../../domain/services/todo.service";
import TodoMemoryRepository from "../../../repositories/memory/todo-memory.repository";

export class TodoRouter {
  static get routes(): Router {
    const router = Router();

    const todoRepository = new TodoMemoryRepository();
    const todoService = new TodoService(todoRepository);
    const todoController = new TodoController(todoService);

    router.get("/", todoController.getAll);
    router.get("/:id", todoController.getById);
    router.post("/", todoController.create);
    router.put("/:id", todoController.update);
    router.delete("/:id", todoController.delete);

    return router;
  }
}

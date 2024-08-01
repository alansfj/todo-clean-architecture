import { Router } from "express";
import { TodoController } from "./todo.controller";
import { TodoService } from "../../../../domain/services/todo.service";
import TodoMemoryRepository from "../../../repositories/memory/todo-memory.repository";
import { TodoPrismaPostgresRepository } from "../../../repositories/prisma-postgres/todo-prisma-postgres.repository";

export class TodoRouter {
  static get routes(): Router {
    const router = Router();

    const todoMemoryRepository = new TodoMemoryRepository();
    const todoPrismaRepository = new TodoPrismaPostgresRepository();
    // const todoService = new TodoService(todoMemoryRepository);
    const todoService = new TodoService(todoMemoryRepository);
    const todoController = new TodoController(todoService);

    router.get("/", todoController.getAll);
    router.get("/:id", todoController.getById);
    router.post("/", todoController.create);
    router.put("/:id", todoController.update);
    router.delete("/:id", todoController.delete);

    return router;
  }
}

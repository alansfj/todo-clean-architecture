import { Request, Response } from "express";
import { GetTodosUseCase } from "../../../../domain/use-cases/get-todos.use-case";
import { TodoServiceInterface } from "../../../../domain/services/todo.service.interface";
import { GetTodoUseCase } from "../../../../domain/use-cases/get-todo.use-case";
import { CreateTodoDto } from "../../../../domain/dtos/create-todo.dto";
import { CreateTodoUseCase } from "../../../../domain/use-cases/create-todo.use-case";
import { UpdateTodoDto } from "../../../../domain/dtos/update-todo.dto";
import { UpdateTodoUseCase } from "../../../../domain/use-cases/update-todo.use-case";
import { DeleteTodoUseCase } from "../../../../domain/use-cases/delete-todo.use-case";
import { CustomError } from "../../../../domain/errors/custom-error";

export class TodoController {
  constructor(private readonly todoService: TodoServiceInterface) {}

  getAll = (req: Request, res: Response) => {
    new GetTodosUseCase(this.todoService)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error: CustomError) => this.handleError(res, error));
  };

  getById = (req: Request, res: Response) => {
    new GetTodoUseCase(this.todoService)
      .execute(Number(req.params.id))
      .then((todo) => res.json(todo))
      .catch((error: CustomError) => this.handleError(res, error));
  };

  create = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      this.handleError(res, error);
      return;
    }

    new CreateTodoUseCase(this.todoService)
      .execute(createTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error: CustomError) => this.handleError(res, error));
  };

  update = (req: Request, res: Response) => {
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id: Number(req.params.id),
    });

    if (error) {
      this.handleError(res, error);
      return;
    }

    new UpdateTodoUseCase(this.todoService)
      .execute(updateTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error: CustomError) => this.handleError(res, error));
  };

  delete = (req: Request, res: Response) => {
    new DeleteTodoUseCase(this.todoService)
      .execute(Number(req.params.id))
      .then((todo) => res.json(todo))
      .catch((error: CustomError) => this.handleError(res, error));
  };

  private handleError = (res: Response, error: CustomError) => {
    res.status(error.statusCode).json({ error: error.message });
  };
}

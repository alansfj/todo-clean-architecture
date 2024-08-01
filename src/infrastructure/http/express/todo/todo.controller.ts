import { Request, Response } from "express";
import { GetTodosUseCase } from "../../../../domain/use-cases/get-todos.use-case";
import { TodoServiceInterface } from "../../../../domain/services/todo.service.interface";
import { GetTodoUseCase } from "../../../../domain/use-cases/get-todo.use-case";
import { CreateTodoDto } from "../../../../domain/dtos/create-todo.dto";
import { CreateTodoUseCase } from "../../../../domain/use-cases/create-todo.use-case";
import { UpdateTodoDto } from "../../../../domain/dtos/update-todo.dto";
import { UpdateTodoUseCase } from "../../../../domain/use-cases/update-todo.use-case";
import { DeleteTodoUseCase } from "../../../../domain/use-cases/delete-todo.use-case";

export class TodoController {
  constructor(private readonly todoService: TodoServiceInterface) {}

  getAll = (req: Request, res: Response) => {
    new GetTodosUseCase(this.todoService)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => res.status(400).json({ error }));
  };

  getById = (req: Request, res: Response) => {
    new GetTodoUseCase(this.todoService)
      .execute(Number(req.params.id))
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  create = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) res.status(400).json({ error });

    new CreateTodoUseCase(this.todoService)
      .execute(createTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  update = (req: Request, res: Response) => {
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id: Number(req.params.id),
    });

    if (error) res.status(400).json({ error });

    new UpdateTodoUseCase(this.todoService)
      .execute(updateTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  delete = (req: Request, res: Response) => {
    new DeleteTodoUseCase(this.todoService)
      .execute(Number(req.params.id))
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
}

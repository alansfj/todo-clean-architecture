import { TodoServiceInterface } from "../services/todo.service.interface";

export class GetTodosUseCase {
  constructor(private readonly todoService: TodoServiceInterface) {}

  execute() {
    return this.todoService.getAll();
  }
}

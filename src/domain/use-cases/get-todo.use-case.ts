import { TodoServiceInterface } from "../services/todo.service.interface";

export class GetTodoUseCase {
  constructor(private readonly todoService: TodoServiceInterface) {}

  execute(id: number) {
    return this.todoService.getById(id);
  }
}

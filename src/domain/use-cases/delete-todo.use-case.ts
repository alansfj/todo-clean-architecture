import { TodoServiceInterface } from "../services/todo.service.interface";

export class DeleteTodoUseCase {
  constructor(private readonly todoService: TodoServiceInterface) {}

  execute(id: number) {
    return this.todoService.delete(id);
  }
}

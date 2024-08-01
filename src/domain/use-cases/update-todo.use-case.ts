import { UpdateTodoDto } from "../dtos/update-todo.dto";
import { TodoServiceInterface } from "../services/todo.service.interface";

export class UpdateTodoUseCase {
  constructor(private readonly todoService: TodoServiceInterface) {}

  execute(updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(updateTodoDto);
  }
}

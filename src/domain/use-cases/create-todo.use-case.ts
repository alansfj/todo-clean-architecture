import { CreateTodoDto } from "../dtos/create-todo.dto";
import { TodoServiceInterface } from "../services/todo.service.interface";

export class CreateTodoUseCase {
  constructor(private readonly todoService: TodoServiceInterface) {}

  execute(createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }
}

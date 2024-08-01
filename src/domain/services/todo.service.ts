import { CreateTodoDto } from "../dtos/create-todo.dto";
import { UpdateTodoDto } from "../dtos/update-todo.dto";
import { TodoEntity } from "../entities/todo.entity";
import { TodoRepositoryInterface } from "../repositories/todo.repository.interface";
import { TodoServiceInterface } from "./todo.service.interface";

export class TodoService implements TodoServiceInterface {
  constructor(private readonly todoRepository: TodoRepositoryInterface) {}

  getAll(): Promise<TodoEntity[]> {
    return this.todoRepository.getAll();
  }

  getById(id: number): Promise<TodoEntity> {
    return this.todoRepository.getById(id);
  }

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoRepository.create(createTodoDto);
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.todoRepository.getById(updateTodoDto.id);

    return this.todoRepository.update(updateTodoDto);
  }

  async delete(id: number): Promise<TodoEntity> {
    await this.todoRepository.getById(id);

    return this.todoRepository.delete(id);
  }
}

import { CreateTodoDto } from "../dtos/create-todo.dto";
import { UpdateTodoDto } from "../dtos/update-todo.dto";
import { TodoEntity } from "../entities/todo.entity";

export interface TodoServiceInterface {
  getAll(): Promise<TodoEntity[]>;
  getById(id: number): Promise<TodoEntity>;
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
  update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
  delete(id: number): Promise<TodoEntity>;
}

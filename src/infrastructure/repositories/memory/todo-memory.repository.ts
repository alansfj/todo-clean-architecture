import { CreateTodoDto } from "../../../domain/dtos/create-todo.dto";
import { UpdateTodoDto } from "../../../domain/dtos/update-todo.dto";
import { TodoEntity } from "../../../domain/entities/todo.entity";
import { TodoRepositoryInterface } from "../../../domain/repositories/todo.repository.interface";
import { TODOS } from "../../database/memory/todos";

export default class TodoMemoryRepository implements TodoRepositoryInterface {
  async getAll(): Promise<TodoEntity[]> {
    return TODOS.map(TodoEntity.fromObject);
  }

  async getById(id: number): Promise<TodoEntity> {
    const foundTodo = TODOS.find((todo) => todo.id === id);

    if (!foundTodo) throw `todo with id ${id} not found`;

    return TodoEntity.fromObject(foundTodo);
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const { text } = createTodoDto;

    const newTodo = {
      text,
      id: TODOS.length ? Math.max(...TODOS.map((todo) => todo.id)) + 1 : 1,
      createdAt: new Date(),
      isCompleted: false,
    };

    TODOS.push(newTodo);

    return TodoEntity.fromObject(newTodo);
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const { id } = updateTodoDto;

    const foundTodoIndex = TODOS.findIndex((todo) => todo.id === id);

    const todoToUpdate = TODOS[foundTodoIndex];

    const updatedTodo = {
      ...todoToUpdate,
      ...updateTodoDto.values,
    };

    TODOS.splice(foundTodoIndex, 1, updatedTodo);

    return TodoEntity.fromObject(updatedTodo);
  }

  async delete(id: number): Promise<TodoEntity> {
    const foundTodoIndex = TODOS.findIndex((todo) => todo.id === id);

    const [deletedTodo] = TODOS.splice(foundTodoIndex, 1);

    return TodoEntity.fromObject(deletedTodo);
  }
}

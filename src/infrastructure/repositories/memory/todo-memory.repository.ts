import { CreateTodoDto } from "../../../domain/dtos/create-todo.dto";
import { UpdateTodoDto } from "../../../domain/dtos/update-todo.dto";
import { TodoEntity } from "../../../domain/entities/todo.entity";
import { CustomError } from "../../../domain/errors/custom-error";
import { TodoRepositoryInterface } from "../../../domain/repositories/todo.repository.interface";
import { TODOS } from "../../database/memory/todos";

export default class TodoMemoryRepository implements TodoRepositoryInterface {
  async getAll(): Promise<TodoEntity[]> {
    try {
      return TODOS.map(TodoEntity.fromObject);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getById(id: number): Promise<TodoEntity> {
    try {
      if (isNaN(id)) throw CustomError.badRequest(`id must be a number`);

      const foundTodo = TODOS.find((todo) => todo.id === id);

      if (!foundTodo)
        throw CustomError.notFound(`todo with id ${id} not found`);

      return TodoEntity.fromObject(foundTodo);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    try {
      const { text } = createTodoDto;

      const newTodo = {
        text,
        id: TODOS.length ? Math.max(...TODOS.map((todo) => todo.id)) + 1 : 1,
        createdAt: new Date(),
        isCompleted: false,
      };

      TODOS.push(newTodo);

      return TodoEntity.fromObject(newTodo);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    try {
      const { id } = updateTodoDto;

      const foundTodoIndex = TODOS.findIndex((todo) => todo.id === id);

      const todoToUpdate = TODOS[foundTodoIndex];

      const updatedTodo = {
        ...todoToUpdate,
        ...updateTodoDto.values,
      };

      TODOS.splice(foundTodoIndex, 1, updatedTodo);

      return TodoEntity.fromObject(updatedTodo);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(id: number): Promise<TodoEntity> {
    try {
      const foundTodoIndex = TODOS.findIndex((todo) => todo.id === id);

      const [deletedTodo] = TODOS.splice(foundTodoIndex, 1);

      return TodoEntity.fromObject(deletedTodo);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): CustomError {
    if (error instanceof CustomError) {
      return error;
    } else if (error instanceof Error) {
      return CustomError.internalServer(error.message);
    } else {
      return CustomError.unknow();
    }
  }
}

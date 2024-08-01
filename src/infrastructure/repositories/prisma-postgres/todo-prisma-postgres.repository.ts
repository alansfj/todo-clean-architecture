import { CreateTodoDto } from "../../../domain/dtos/create-todo.dto";
import { UpdateTodoDto } from "../../../domain/dtos/update-todo.dto";
import { TodoEntity } from "../../../domain/entities/todo.entity";
import { CustomError } from "../../../domain/errors/custom-error";
import { TodoRepositoryInterface } from "../../../domain/repositories/todo.repository.interface";
import { prisma } from "../../database/prisma-postgres/index";

export class TodoPrismaPostgresRepository implements TodoRepositoryInterface {
  async getAll(): Promise<TodoEntity[]> {
    try {
      const todos = await prisma.todo.findMany();

      return todos.map(TodoEntity.fromObject);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getById(id: number): Promise<TodoEntity> {
    try {
      if (isNaN(id)) throw CustomError.badRequest(`id must be a number`);

      const todo = await prisma.todo.findFirst({
        where: {
          id: id,
        },
      });

      if (!todo) throw CustomError.notFound(`todo with id ${id} not found`);

      return TodoEntity.fromObject(todo);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    try {
      const { text } = createTodoDto;

      const newTodo = await prisma.todo.create({
        data: {
          text,
          createdAt: new Date(),
        },
      });

      return TodoEntity.fromObject(newTodo);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    try {
      const { id } = updateTodoDto;

      const updatedTodo = await prisma.todo.update({
        where: {
          id,
        },
        data: {
          ...updateTodoDto.values,
        },
      });

      return TodoEntity.fromObject(updatedTodo);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(id: number): Promise<TodoEntity> {
    try {
      const deletedTodo = await prisma.todo.delete({
        where: {
          id,
        },
      });

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

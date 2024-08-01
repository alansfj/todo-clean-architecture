import { CreateTodoDto } from "../../../domain/dtos/create-todo.dto";
import { UpdateTodoDto } from "../../../domain/dtos/update-todo.dto";
import { TodoEntity } from "../../../domain/entities/todo.entity";
import { TodoRepositoryInterface } from "../../../domain/repositories/todo.repository.interface";
import { prisma } from "../../database/prisma-postgres/index";

export class TodoPrismaPostgresRepository implements TodoRepositoryInterface {
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map(TodoEntity.fromObject);
  }

  async getById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    if (!todo) throw `todo with id ${id} not found`;

    return TodoEntity.fromObject(todo);
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const { text } = createTodoDto;

    const newTodo = await prisma.todo.create({
      data: {
        text,
        createdAt: new Date(),
      },
    });

    return TodoEntity.fromObject(newTodo);
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.getById(updateTodoDto.id);

    const updatedTodo = await prisma.todo.update({
      where: {
        id: updateTodoDto.id,
      },
      data: {
        ...updateTodoDto.values,
      },
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async delete(id: number): Promise<TodoEntity> {
    await this.getById(id);

    const deletedTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    return TodoEntity.fromObject(deletedTodo);
  }
}

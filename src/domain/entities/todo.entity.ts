export class TodoEntity {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly createdAt: Date,
    public readonly isCompleted: boolean
  ) {}

  static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, text, createdAt, isCompleted } = object;

    return new TodoEntity(id, text, createdAt, isCompleted);
  }
}

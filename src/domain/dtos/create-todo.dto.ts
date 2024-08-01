export class CreateTodoDto {
  private constructor(public readonly text: string) {}

  static create(object: { [key: string]: any }): [string?, CreateTodoDto?] {
    const { text } = object;

    if (!text) return ["text property is required"];

    if (typeof text !== "string") return ["text property must be a string"];

    return [undefined, new CreateTodoDto(text)];
  }
}

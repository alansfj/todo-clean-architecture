export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly isCompleted?: boolean
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, isCompleted } = object;

    if (!id) return ["id property is required"];

    if (isNaN(id)) return ["id property must be a number"];

    if (!text && !isCompleted)
      return ["text or isCompleted properties are required"];

    if (text) {
      if (typeof text !== "string") return ["text property must be a string"];
    }

    if (isCompleted !== undefined) {
      if (typeof isCompleted !== "boolean")
        return ["isCompleted property must be a boolean"];
    }

    return [undefined, new UpdateTodoDto(id, text, isCompleted)];
  }

  get values() {
    const object: { [key: string]: any } = {};

    if (this.text) object.text = this.text;
    if (this.isCompleted) object.isCompleted = this.isCompleted;

    return object;
  }
}

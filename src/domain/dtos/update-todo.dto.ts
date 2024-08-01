import { CustomError } from "../errors/custom-error";

export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly isCompleted?: boolean
  ) {}

  static create(object: {
    [key: string]: any;
  }): [CustomError?, UpdateTodoDto?] {
    const { id, text, isCompleted } = object;

    if (isNaN(id))
      return [CustomError.badRequest("id property must be a number")];

    if (!id) return [CustomError.badRequest("id property is required")];

    if (text === undefined && isCompleted === undefined)
      return [
        CustomError.badRequest("text or isCompleted properties are required"),
      ];

    if (text !== undefined) {
      if (typeof text !== "string")
        return [CustomError.badRequest("text property must be a string")];
    }

    if (isCompleted !== undefined) {
      if (typeof isCompleted !== "boolean")
        return [
          CustomError.badRequest("isCompleted property must be a boolean"),
        ];
    }

    return [undefined, new UpdateTodoDto(id, text, isCompleted)];
  }

  get values() {
    const object: { [key: string]: any } = {};

    if (this.text) object.text = this.text;
    if (this.isCompleted !== undefined) object.isCompleted = this.isCompleted;

    return object;
  }
}

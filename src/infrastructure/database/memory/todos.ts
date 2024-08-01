interface Todo {
  id: number;
  text: string;
  createdAt: Date;
  isCompleted: boolean;
}

export const TODOS: Todo[] = [];

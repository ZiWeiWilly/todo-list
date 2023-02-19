export type InitTodo = {
  title: string;
  content: string;
  due: string;
  place: string;
  flag: string;
  priority: "Low" | "Middle" | "High";
  isCompleted: boolean;
};

export type Todo = InitTodo & {id: number}

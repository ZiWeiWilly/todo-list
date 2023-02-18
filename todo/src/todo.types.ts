export type Todo = {
  id: number;
  title: string;
  content: string;
  due: string;
  place: string;
  flag: string;
  priority: "Low" | "Middle" | "High";
  isCompleted: boolean;
};

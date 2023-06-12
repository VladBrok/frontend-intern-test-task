import { ITodo } from "../../shared-types";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";

export interface ITodoListProps {
  todos: ITodo[];
  update: (id: string) => void;
}

export default function TodoList({ todos, update }: ITodoListProps) {
  return (
    <div className="todo-list overflow-x-hidden overflow-y-auto border-bottom">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} update={update} />
      ))}
    </div>
  );
}

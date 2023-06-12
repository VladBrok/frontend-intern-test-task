import { ITodo } from "../../shared-types";
import FormCheck from "react-bootstrap/FormCheck";
import "./TodoItem.css";

export interface ITodoItemProps {
  todo: ITodo;
  update: (id: string) => void;
}

export default function TodoItem({ todo, update }: ITodoItemProps) {
  return (
    <FormCheck
      checked={todo.isDone}
      type="checkbox"
      id={todo.id}
      label={todo.text}
      onChange={() => update(todo.id)}
      className={`${todo.isDone ? "todo-item_done" : ""} todo-item my-3 ms-3`}
    />
  );
}

import { MouseEventHandler } from "react";
import { ITodo } from "../../shared-types";
import FormCheck from "react-bootstrap/FormCheck";
import "./TodoItem.css";

export interface ITodoItemProps {
  todo: ITodo;
  update: (id: string) => void;
}

const ITEM_CLASS = "todo-item";

export default function TodoItem({ todo, update }: ITodoItemProps) {
  const handleContainerClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const targetIsItem = (e.target as HTMLElement).classList.contains(
      ITEM_CLASS
    );

    if (targetIsItem) {
      update(todo.id);
    }
  };

  return (
    <div
      className="todo-item__container py-3 ps-3"
      onClick={handleContainerClick}
    >
      <FormCheck
        checked={todo.isDone}
        type="checkbox"
        id={todo.id}
        label={todo.text}
        onChange={() => update(todo.id)}
        className={`${todo.isDone ? "todo-item_done" : ""} ${ITEM_CLASS}`}
      />
    </div>
  );
}

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
    const targetIsContainer = e.target === e.currentTarget;

    if (targetIsItem || targetIsContainer) {
      update(todo.id);
    }
  };

  return (
    <div
      className="todo-item__container py-3 ps-3"
      onClick={handleContainerClick}
      data-testid="todo-item"
    >
      <FormCheck
        id={todo.id}
        className={`${todo.isDone ? "todo-item_done" : ""} ${ITEM_CLASS}`}
      >
        <FormCheck.Input
          type="checkbox"
          onChange={() => update(todo.id)}
          checked={todo.isDone}
          data-testid="todo-item-checkbox"
        />
        <FormCheck.Label data-testid="todo-item-label">
          {todo.text}
        </FormCheck.Label>
      </FormCheck>
    </div>
  );
}

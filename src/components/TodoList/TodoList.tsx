import { useEffect, useRef } from "react";
import { ITodo } from "../../shared-types";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";
import usePrevious from "../../hooks/usePrevious";
import assert from "../../lib/assert";

export interface ITodoListProps {
  todos: ITodo[];
  update: (id: string) => void;
}

export default function TodoList({ todos, update }: ITodoListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevLength = usePrevious(todos.length);

  useEffect(() => {
    if (prevLength == null) {
      return;
    }

    if (todos.length > prevLength) {
      assert(containerRef.current, "containerRef is null.");
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [prevLength, todos.length]);

  return (
    <div
      className="todo-list overflow-x-hidden overflow-y-auto border-bottom"
      ref={containerRef}
    >
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} update={update} />
      ))}
    </div>
  );
}

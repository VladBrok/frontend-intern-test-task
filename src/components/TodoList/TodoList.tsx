import { useEffect, useRef } from "react";
import { ITodo } from "../../shared-types";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";
import usePrevious from "../../hooks/usePrevious";
import assert from "../../lib/assert";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export interface ITodoListProps {
  todos: ITodo[];
  update: (id: string) => void;
  noItemsText: string;
  activeFilter: string;
}

export default function TodoList({
  todos,
  update,
  noItemsText,
  activeFilter,
}: ITodoListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [innerContainerRef] = useAutoAnimate();
  const prevLength = usePrevious(todos.length);
  const prevFilter = usePrevious(activeFilter);

  useEffect(() => {
    if (prevLength == null) {
      return;
    }

    const shouldScrollToBottom =
      todos.length > prevLength &&
      (prevFilter == null || prevFilter === activeFilter);

    if (shouldScrollToBottom) {
      assert(containerRef.current, "containerRef is null.");
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [activeFilter, prevFilter, prevLength, todos.length]);

  return (
    <div
      className="todo-list overflow-x-hidden overflow-y-auto border-bottom"
      ref={containerRef}
    >
      <div ref={innerContainerRef} className="todo-list__inner-container">
        {todos.length !== 0 ? (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} update={update} />
          ))
        ) : (
          <p className="m-3 text-secondary">{noItemsText}</p>
        )}
      </div>
    </div>
  );
}

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import assert from "../../lib/assert";
import { ITodo } from "../../shared-types";
import TodoItem from "../TodoItem/TodoItem";
import "./App.css";
import TodoForm from "../TodoForm/TodoForm";
import useFilter, { FILTERS } from "../../hooks/useFilter";
import FilterTabs from "../FilterTabs/FilterTabs";

const INITIAL_TODOS: ITodo[] = [
  {
    id: "1",
    text: "Тестовое задание",
    isDone: false,
  },
  {
    id: "2",
    text: "Прекрасный код",
    isDone: true,
  },
  {
    id: "3",
    text: "Покрытие тестами",
    isDone: false,
  },
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0].name);
  const [todos, setTodos] = useState<ITodo[]>(INITIAL_TODOS);

  const handleSubmit = (input: string): void => {
    const newTodo: ITodo = {
      id: uuidv4(),
      isDone: false,
      text: input,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = (id: string): void => {
    setTodos((prev) => {
      assert(
        prev.find((todo) => todo.id === id),
        `Todo with id ${id} not found.`
      );

      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
    });
  };

  const clearCompleted = (): void => {
    setTodos((prev) => prev.filter((todo) => !todo.isDone));
  };

  const filteredTodos = useFilter(todos, activeFilter);

  const completedItemCount = todos.filter((todo) => todo.isDone).length;
  const leftItemsCount = todos.filter((todo) => !todo.isDone).length;
  const itemsPluralized = leftItemsCount === 1 ? "item" : "items";
  const filterNames = FILTERS.map((filter) => filter.name);

  return (
    <Container>
      <h1 className="text-center my-4">todos</h1>
      <Container className="todos-container">
        <Card>
          <div className="border-bottom border-bottom-1">
            <TodoForm onSubmit={handleSubmit} />
          </div>
          <>
            <div className="todo-list overflow-x-hidden overflow-y-auto border-bottom">
              {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} update={updateTodo} />
              ))}
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0 ps-3">
                {leftItemsCount} {itemsPluralized} left
              </p>
              <FilterTabs
                active={activeFilter}
                setActive={setActiveFilter}
                names={filterNames}
              />
              <Button
                variant="link"
                onClick={clearCompleted}
                disabled={completedItemCount === 0}
              >
                Clear completed
              </Button>
            </div>
          </>
        </Card>
      </Container>
    </Container>
  );
}

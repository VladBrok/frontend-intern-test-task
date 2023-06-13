import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { assert } from "../../lib/assert";
import { ITodo } from "../../shared-types";
import "./App.css";
import TodoForm from "../TodoForm/TodoForm";
import { FILTERS, useFilter } from "../../hooks/useFilter";
import FilterTabs from "../FilterTabs/FilterTabs";
import TodoList from "../TodoList/TodoList";

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
  const [activeFilterName, setActiveFilterName] = useState(FILTERS[0].name);
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

  const filteredTodos = useFilter(todos, activeFilterName);

  const completedItemCount = todos.filter((todo) => todo.isDone).length;
  const leftItemsCount = todos.filter((todo) => !todo.isDone).length;
  const itemsPluralized = leftItemsCount === 1 ? "item" : "items";
  const filterNames = FILTERS.map((filter) => filter.name);
  const activeFilter = FILTERS.find(
    (filter) => filter.name === activeFilterName
  );

  return (
    <Container className="app">
      <h1 className="text-center my-4 fw-normal">todos</h1>
      <Container className="app__todos-container">
        <Card>
          <div className="border-bottom border-bottom-1">
            <TodoForm onSubmit={handleSubmit} />
          </div>
          <>
            <TodoList
              todos={filteredTodos}
              update={updateTodo}
              noItemsText={activeFilter?.noItemsText || ""}
              activeFilter={activeFilterName}
            />
            <div className="my-3 d-flex flex-column flex-md-row gap-2 justify-content-between align-items-center">
              <p className="app__footer-item mb-0 px-3">
                {leftItemsCount} {itemsPluralized} left
              </p>
              <div className="app__footer-item">
                <FilterTabs
                  active={activeFilterName}
                  setActive={setActiveFilterName}
                  names={filterNames}
                />
              </div>
              <Button
                variant="link"
                onClick={clearCompleted}
                disabled={completedItemCount === 0}
                className="app__footer-item"
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

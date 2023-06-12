import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import assert from "../../lib/assert";
import { ITodo } from "../../types";
import TodoItem from "../TodoItem/TodoItem";
import "./App.css";
import TodoForm from "../TodoForm/TodoForm";

interface IFilter {
  name: string;
  apply: (todos: ITodo[]) => ITodo[];
}

const FILTERS: IFilter[] = [
  {
    name: "All",
    apply: (todos) => todos,
  },
  {
    name: "Active",
    apply: (todos) => todos.filter((todo) => !todo.isDone),
  },
  {
    name: "Completed",
    apply: (todos) => todos.filter((todo) => todo.isDone),
  },
];

assert(
  FILTERS.length > 0,
  `Filters length ${FILTERS.length} is less than or equal to zero.`
);
assert(
  new Set(FILTERS.map((x) => x.name)).size === FILTERS.length,
  "Filter names should be distinct."
);

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

  const filteredTodos = useMemo(() => {
    const filter = FILTERS.find((x) => x.name === activeFilter);
    assert(filter, `Active filter ${activeFilter} not found.`);
    return filter.apply(todos);
  }, [activeFilter, todos]);

  const completedItemCount = todos.filter((todo) => todo.isDone).length;
  const leftItemsCount = todos.filter((todo) => !todo.isDone).length;
  const itemsPluralized = leftItemsCount === 1 ? "item" : "items";

  return (
    <Container>
      <h1 className="text-center my-4">todos</h1>
      <Container className="todos-container">
        <Card className="">
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
              <Tabs
                activeKey={activeFilter}
                onSelect={(k) => setActiveFilter(k!)}
                className="border-bottom-0"
              >
                {FILTERS.map((filter) => (
                  <Tab
                    key={filter.name}
                    eventKey={filter.name}
                    title={filter.name}
                  ></Tab>
                ))}
              </Tabs>
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

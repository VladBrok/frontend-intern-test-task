import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./App.css";
import { useAccordionButton } from "react-bootstrap";
import { FormEvent, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import assert from "./lib/assert";

interface ITodo {
  id: string;
  text: string;
  isDone: boolean;
}

interface IFilter {
  name: string;
  apply: (todos: ITodo[]) => ITodo[];
}

const ACCORDION_KEY = "0";

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
  const [activeKey, setActiveKey] = useState(ACCORDION_KEY);
  const [todoInput, setTodoInput] = useState("");
  const [activeFilter, setActiveFilter] = useState(FILTERS[0].name);
  const [todos, setTodos] = useState<ITodo[]>(INITIAL_TODOS);

  const toggleAccordion = useAccordionButton(ACCORDION_KEY, () =>
    setActiveKey((prev) => (prev ? "" : ACCORDION_KEY))
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTodoInput = todoInput.trim();
    if (!trimmedTodoInput) {
      return;
    }

    const newTodo: ITodo = {
      id: uuidv4(),
      isDone: false,
      text: trimmedTodoInput,
    };
    setTodos((prev) => [...prev, newTodo]);
    setTodoInput("");
  };

  const updateTodo = (id: string) => {
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

  const clearCompleted = () => {
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
        <Accordion activeKey={activeKey} className="border border-1">
          <Card className="border-0">
            <div className="border-bottom border-bottom-1">
              <Form
                onSubmit={handleSubmit}
                className="d-flex align-items-center"
              >
                <button
                  type="button"
                  style={{ backgroundColor: "pink" }}
                  onClick={toggleAccordion}
                >
                  Click me!
                </button>
                <Form.Group controlId="todoTextInput">
                  <Form.Control
                    type="text"
                    placeholder="What needs to be done?"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                    className="border-0"
                  />
                </Form.Group>
              </Form>
            </div>
            <Accordion.Collapse eventKey={ACCORDION_KEY}>
              <>
                {filteredTodos.map((todo) => (
                  <Form.Check
                    key={todo.id}
                    checked={todo.isDone}
                    type="checkbox"
                    id={todo.id}
                    label={todo.text}
                    onChange={() => updateTodo(todo.id)}
                    className={`${todo.isDone ? "todo_done" : ""}`}
                  />
                ))}
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 ps-2">
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
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    </Container>
  );
}

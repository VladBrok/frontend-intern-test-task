import { render } from "@testing-library/react";
import App from "./App";
import user from "@testing-library/user-event";
import { addTodo } from "../../lib/tests/addTodo";
import { getTodos } from "../../lib/tests/getTodos";
import { getTodoCheckboxes } from "../../lib/tests/getTodoCheckboxes";
import { getTodoLabels } from "../../lib/tests/getTodoLabels";

describe("App", () => {
  it("adds a todo item with specified text", async () => {
    const app = render(<App />);
    const prevTodos = await getTodos(app);
    const TEXT = "выучить fortran";

    await addTodo(app, TEXT);
    const todos = await getTodos(app);
    const lastTodoLabel = (await getTodoLabels(app)).at(-1);
    const lastTodoCheckbox = (await getTodoCheckboxes(app)).at(-1);

    expect(todos.length).toBe(prevTodos.length + 1);
    expect(lastTodoLabel?.textContent).toBe(TEXT);
    expect(lastTodoCheckbox?.checked).toBe(false);
  });

  it("marks a todo item as completed", async () => {
    const app = render(<App />);

    await addTodo(app);
    const lastTodoItem = (await getTodos(app)).at(-1);
    await user.click(lastTodoItem!);
    const lastTodoCheckbox = (await getTodoCheckboxes(app)).at(-1);

    expect(lastTodoCheckbox?.checked).toBe(true);
  });

  it("clears completed items", async () => {
    const app = render(<App />);
    await addTodo(app);
    await addTodo(app);
    const lastTodoItem = (await getTodos(app)).at(-1);
    await user.click(lastTodoItem!);
    const prevTotalCount = (await getTodos(app)).length;
    const prevCompleteCount = (await getTodoCheckboxes(app)).filter(
      (el) => el.checked
    ).length;

    const clearButton = await app.findByText("Clear completed");
    await user.click(clearButton);
    const totalCount = (await getTodos(app)).length;
    const completedCount = (await getTodoCheckboxes(app)).filter(
      (el) => el.checked
    ).length;

    expect(totalCount).toBe(prevTotalCount - prevCompleteCount);
    expect(completedCount).toBe(0);
  });
});

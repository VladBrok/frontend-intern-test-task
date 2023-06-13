import { render } from "@testing-library/react";
import App from "./App";
import user from "@testing-library/user-event";
import { TEST_IDS } from "../../lib/tests/testIds";

describe("App", () => {
  it("adds a todo item with specified text", async () => {
    const app = render(<App />);
    const prevTodos = await app.findAllByTestId(TEST_IDS.TODO_ITEM);
    const input = await app.findByPlaceholderText("What needs to be done?");
    const TEXT = "выучить fortran";

    await user.type(input, `${TEXT}{enter}`);
    const todos = await app.findAllByTestId(TEST_IDS.TODO_ITEM);
    const lastTodoLabel = (
      await app.findAllByTestId(TEST_IDS.TODO_ITEM_LABEL)
    ).at(-1);
    const lastTodoCheckbox = (
      await app.findAllByTestId(TEST_IDS.TODO_ITEM_CHECKBOX)
    ).at(-1) as HTMLInputElement;

    expect(todos.length).toBe(prevTodos.length + 1);
    expect(lastTodoLabel?.textContent).toBe(TEXT);
    expect(lastTodoCheckbox.checked).toBe(false);
  });

  it("marks a todo item as completed", async () => {
    const app = render(<App />);
    const input = await app.findByPlaceholderText("What needs to be done?");
    const TEXT = "выучить fortran";

    await user.type(input, `${TEXT}{enter}`);
    const lastTodoItem = (await app.findAllByTestId(TEST_IDS.TODO_ITEM)).at(
      -1
    )!;
    await user.click(lastTodoItem);
    const lastTodoCheckbox = (
      await app.findAllByTestId(TEST_IDS.TODO_ITEM_CHECKBOX)
    ).at(-1) as HTMLInputElement;

    expect(lastTodoCheckbox.checked).toBe(true);
  });

  it("clears completed items", async () => {
    const app = render(<App />);
    const input = await app.findByPlaceholderText("What needs to be done?");
    const TEXT = "выучить fortran";
    await user.type(input, `${TEXT}{enter}`);
    await user.type(input, `${TEXT}{enter}`);
    const lastTodoItem = (await app.findAllByTestId(TEST_IDS.TODO_ITEM)).at(
      -1
    )!;
    await user.click(lastTodoItem);
    const prevTotalCount = (await app.findAllByTestId(TEST_IDS.TODO_ITEM))
      .length;
    const prevCompleteCount = (
      await app.findAllByTestId(TEST_IDS.TODO_ITEM_CHECKBOX)
    ).filter((el) => (el as HTMLInputElement).checked).length;

    const clearButton = await app.findByText("Clear completed");
    await user.click(clearButton);
    const totalCount = (await app.findAllByTestId(TEST_IDS.TODO_ITEM)).length;
    const completedCount = (
      await app.findAllByTestId(TEST_IDS.TODO_ITEM_CHECKBOX)
    ).filter((el) => (el as HTMLInputElement).checked).length;

    expect(totalCount).toBe(prevTotalCount - prevCompleteCount);
    expect(completedCount).toBe(0);
  });
});

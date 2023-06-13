import { RenderResult } from "@testing-library/react";
import user from "@testing-library/user-event";

export async function addTodo(
  app: RenderResult,
  text = "выучить fortran"
): Promise<void> {
  const input = await app.findByPlaceholderText("What needs to be done?");
  await user.type(input, `${text}{enter}`);
}

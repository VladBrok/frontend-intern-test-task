import { RenderResult } from "@testing-library/react";
import { TEST_IDS } from "./testIds";

export async function getTodoCheckboxes(
  app: RenderResult
): Promise<HTMLInputElement[]> {
  return (await app.findAllByTestId(TEST_IDS.TODO_ITEM_CHECKBOX)).map(
    (el) => el as HTMLInputElement
  );
}

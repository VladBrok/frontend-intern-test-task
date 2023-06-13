import { RenderResult } from "@testing-library/react";
import { TEST_IDS } from "./testIds";

export async function getTodoLabels(app: RenderResult): Promise<HTMLElement[]> {
  return await app.findAllByTestId(TEST_IDS.TODO_ITEM_LABEL);
}

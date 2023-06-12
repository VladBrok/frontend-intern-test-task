import { useMemo } from "react";
import { ITodo } from "../shared-types";
import assert from "../lib/assert";

export interface IFilter {
  name: string;
  apply: (todos: ITodo[]) => ITodo[];
}

export const FILTERS: IFilter[] = [
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

export default function useFilter(todos: ITodo[], activeFilterName: string) {
  return useMemo(() => {
    const filter = FILTERS.find((x) => x.name === activeFilterName);
    assert(filter, `Active filter ${activeFilterName} not found.`);
    return filter.apply(todos);
  }, [activeFilterName, todos]);
}

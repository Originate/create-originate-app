import { ActionOf } from "@/frontend/src/lib"
import { IDispatch } from "@/frontend/src/store"

export type CounterStore = number

export type CounterAction =
  | ActionOf<"counter/reset">
  | ActionOf<"counter/increment">

export const initialStore: CounterStore = 0

export const reducer = (
  prev: CounterStore,
  action: CounterAction,
): CounterStore => {
  switch (action.key) {
    case "counter/increment":
      return prev + 1
    case "counter/reset":
      return 0
    default:
      return prev
  }
}

export function dispatch(this: IDispatch) {
  return {
    onIncrement: () => this.dispatch({ key: "counter/increment" }),
    onReset: () => this.dispatch({ key: "counter/reset" }),
  }
}

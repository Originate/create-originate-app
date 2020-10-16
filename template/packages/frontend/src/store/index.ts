import { Action } from "./types"

export { initialStore, reducer } from "./reducer"
export type { Action, Store } from "./types"

// In an ideal world, this interface wouldn't exist, but the modules can't
/// import from src/dispatch without creating a dependency loop, which doesn't
/// break anything at runtime but DOES break TypeScript's type inference engine
export interface IDispatch {
  dispatch: (action: Action) => void
}

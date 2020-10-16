export { isBad, isGood, isLoading } from "./fetch"
export type { Fetch } from "./fetch"

// This extends TValue with a {key: 'something'}
export type ActionOf<TKey extends string, TValue = {}> = { key: TKey } & TValue

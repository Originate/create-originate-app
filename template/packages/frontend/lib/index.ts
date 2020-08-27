export {Fetch, isLoading, isGood, isBad} from './fetch';

// This extends TValue with a {key: 'something'}
export type ActionOf<TKey extends string, TValue = {}> = {key: TKey} & TValue;

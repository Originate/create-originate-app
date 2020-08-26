export type Fetch<T> = {state: 'loading'} | {state: 'bad'; error: string} | {state: 'good'; data: T};

export type HelloStore = {
  counter: number;
  mood?: Fetch<Array<{mood: string}>>;
};

export type Store = {
  hello: HelloStore;
};

// This extends TValue with a {key: 'something'}
type K<TKey extends string, TValue> = {key: TKey} & TValue;

export type Action = K<'hello/click', Fetch<Array<{mood: string}>>> | K<'hello/reset', {}>;

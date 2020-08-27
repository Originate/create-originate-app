import {Fetch} from '@/frontend/lib';

export type HelloStore = {
  mood?: Fetch<Array<{mood: string}>>;
};

export type CounterStore = number;

export type Store = {
  hello: HelloStore;
  counter: CounterStore;
};

// This extends TValue with a {key: 'something'}
type K<TKey extends string, TValue = {}> = {key: TKey} & TValue;

export type Action = K<'hello/click', Fetch<Array<{mood: string}>>> | K<'counter/reset'> | K<'counter/increment'>;

import {CounterStore, Action} from '@/frontend/src/store';

export const initialStore: CounterStore = 0;

export const reducer = (prev: CounterStore, action: Action): CounterStore => {
  switch (action.key) {
    case 'counter/increment':
      return prev + 1;
    case 'counter/reset':
      return 0;
    default:
      return prev;
  }
};

import {HelloStore, Action} from '@/frontend/src/store';

export const initialStore: HelloStore = {};

export const reducer = (prev: HelloStore, action: Action): HelloStore => {
  switch (action.key) {
    case 'hello/click':
      return {...prev, mood: action};
    default:
      return prev;
  }
};

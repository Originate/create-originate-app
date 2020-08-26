import {HelloStore, Action} from './types';

export const helloReducer = (prev: HelloStore, action: Action): HelloStore => {
  switch (action.key) {
    case 'hello/click':
      return {...prev, mood: action, counter: prev.counter + 1};
    case 'hello/reset':
      return {...prev, mood: undefined, counter: 0};
    default:
      return prev;
  }
};

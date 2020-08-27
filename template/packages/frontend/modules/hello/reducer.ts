import {router} from '@/lib';
import {HelloStore, Action, IDispatch} from '@/frontend/src/store';

export const initialStore: HelloStore = {};

export const reducer = (prev: HelloStore, action: Action): HelloStore => {
  switch (action.key) {
    case 'hello/click':
      return {...prev, mood: action};
    default:
      return prev;
  }
};

export function dispatch(this: IDispatch) {
  return {
    onClick: async () => {
      try {
        this.dispatch({key: 'hello/click', state: 'loading'});
        const moods = await router.ping.client({mood: 'big'});
        this.dispatch({key: 'hello/click', state: 'good', data: moods});
      } catch (e) {
        this.dispatch({key: 'hello/click', state: 'bad', error: e.toString()});
      }
    },
  };
}

import {router} from '@/lib';
import {IDispatch} from '@/frontend/src/store';
import {ActionOf, Fetch} from '@/frontend/lib';

export type HelloStore = {
  mood?: Fetch<{mood: string}>;
};

export type HelloAction = ActionOf<'hello/click', Fetch<{mood: string}>>;

export const initialStore: HelloStore = {};

export const reducer = (prev: HelloStore, action: HelloAction): HelloStore => {
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
        const mood = await router.ping.client({mood: 'big'});
        this.dispatch({key: 'hello/click', state: 'good', data: mood});
      } catch (e) {
        this.dispatch({key: 'hello/click', state: 'bad', error: e.toString()});
      }
    },
  };
}

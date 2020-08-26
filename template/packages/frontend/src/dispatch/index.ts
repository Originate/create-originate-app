import {router} from '@/lib';
import {Action} from '@/frontend/src/reducer';

export class Dispatch {
  constructor(public dispatch: (action: Action) => void) {}

  hello = {
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

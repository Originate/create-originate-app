import {Store} from '@/frontend/src/reducer/types';

export const initialStore = (): Store => {
  return {
    hello: {counter: 0},
  };
};

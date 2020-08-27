import {Store, Action} from './types';

type Step = (prev: Store, action: Action) => Action;

type Middleware = (step: Step) => Step;

const logging: Middleware = (step: Step): Step => {
  return (prev: Store, action: Action): Action => {
    console.group(action.key);
    console.info('dispatching', action);
    const result = step(prev, action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
};

export const middlewares: Array<Middleware> = [logging];

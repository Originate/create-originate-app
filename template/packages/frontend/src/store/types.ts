import * as counterModule from '@/frontend/modules/counter/reducer';
import * as helloModule from '@/frontend/modules/hello/reducer';

export type Store = {
  hello: helloModule.HelloStore;
  counter: counterModule.CounterStore;
};

export type Action = counterModule.CounterAction | helloModule.HelloAction;

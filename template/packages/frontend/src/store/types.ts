import * as counterModule from '@/frontend/modules/counter/reducer';
import * as helloModule from '@/frontend/modules/hello/reducer';
import * as authDemoModule from '@/frontend/modules/authDemo/reducer';

export type Store = {
  hello: helloModule.HelloStore;
  counter: counterModule.CounterStore;
  authDemo: authDemoModule.AuthDemoStore;
};

export type Action = counterModule.CounterAction | helloModule.HelloAction | authDemoModule.AuthDemoAction;

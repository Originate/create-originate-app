import {Action} from '@/frontend/src/store';

import * as counterModule from '@/frontend/modules/counter/reducer';
import * as helloModule from '@/frontend/modules/hello/reducer';
import * as authDemoModule from '@/frontend/modules/authDemo/reducer';

/// The Dispatch class dispatches actions so you don't have to!
//
// Less glibly, this class lets individual modules write async actions to
// perform in response to outside changes, e.g. mouse clicks or window resizes.
// We do not want React components to directly dispatch actions to the global
// (store, reducer) system because not every outside change will correspond to
// exactly one action. For example, a fetch results in two dispatches: a loading
// state, and then a good or a bad state. Other, more complex changes might
// result in even more.
//
// What Dispatch does is encapsulate this logic.
export class Dispatch {
  constructor(public dispatch: (action: Action) => void) {}

  // Individual modules have to be imported and then added here. There is no
  // current way to generate TypeScript code like this automatically, but that
  // would be the ideal way this works.
  hello = helloModule.dispatch.call(this);
  counter = counterModule.dispatch.call(this);
  authDemo = authDemoModule.dispatch.call(this);
}

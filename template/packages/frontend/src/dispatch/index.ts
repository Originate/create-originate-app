import {Action} from '@/frontend/src/store';

import * as counterModule from '@/frontend/modules/counter/reducer';
import * as helloModule from '@/frontend/modules/hello/reducer';

export class Dispatch {
  constructor(public dispatch: (action: Action) => void) {}

  hello = helloModule.dispatch.call(this);
  counter = counterModule.dispatch.call(this);
}

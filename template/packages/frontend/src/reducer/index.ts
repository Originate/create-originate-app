export {Store, Action, Fetch} from './types';
export {initialStore} from './store';

import {Store, Action} from './types';
import {helloReducer} from './hello';

export const reducer = (prev: Store, action: Action): Store => ({
  hello: helloReducer(prev.hello, action),
});

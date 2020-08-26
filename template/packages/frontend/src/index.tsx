import * as React from 'react';
import {useReducer, useState, FC} from 'react';

import {initialStore, reducer, Store} from '@/frontend/src/store';
import {Env} from '@/frontend/src/env';
import {Dispatch} from '@/frontend/src/dispatch';
import {StoreContext, DispatchContext} from '@/frontend/src/components/context';

import {Hello} from '@/frontend/modules/hello';

const Contextually: FC<{dispatch: Dispatch; store: Store; children: React.ReactNode}> = ({
  dispatch,
  store,
  children,
}) => (
  <StoreContext.Provider value={store}>
    <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
  </StoreContext.Provider>
);

export const Switchboard: FC<{env: Env}> = ({env}) => {
  React.useEffect(() => {
    console.log('Environment loaded:', env);
  }, [env]);

  const [store, reactDispatch] = useReducer(reducer, initialStore());
  const [dispatch] = useState(new Dispatch(reactDispatch));
  return (
    <Contextually dispatch={dispatch} store={store}>
      <Hello />
    </Contextually>
  );
};

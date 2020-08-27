import * as React from 'react';

import {Store} from '@/frontend/src/store';
import {Dispatch} from '@/frontend/src/dispatch';

// This initial value will never be observed.
export const DispatchContext = React.createContext<Dispatch>((undefined as unknown) as Dispatch);

export const useDispatch = () => React.useContext(DispatchContext);

// This initial value will never be observed.
export const StoreContext = React.createContext<Store>((undefined as unknown) as Store);

export const useStore = () => React.useContext(StoreContext);

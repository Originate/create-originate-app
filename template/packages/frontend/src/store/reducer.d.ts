import {Store, Action} from './types';
import * as React from 'react';

export declare const initialStore: () => Store;
export declare const reducer: React.Reducer<Store, Action>;

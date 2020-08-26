import * as React from 'react';

import {useStore, useDispatch} from '@/frontend/src/components/context';

interface CounterView {
  onIncrement: () => void;
  onReset: () => void;
  counter: number;
}

const CounterView: React.FC<CounterView> = ({onIncrement, onReset, counter}) => (
  <>
    <pre>{counter}</pre>
    <p>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onReset}>Reset</button>
    </p>
  </>
);

export const Counter: React.FC<{}> = () => {
  const store = useStore().counter;
  const dispatch = useDispatch();
  return <CounterView onIncrement={dispatch.counter.onIncrement} onReset={dispatch.counter.onReset} counter={store} />;
};

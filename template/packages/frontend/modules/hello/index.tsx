import * as React from 'react';

import {Fetch, isGood, isBad, isLoading} from '@/frontend/lib';
import {useStore, useDispatch} from '@/frontend/src/components/contexts';

import {Counter} from '@/frontend/modules/counter';

interface HelloView {
  onClick: () => void;
  mood?: Fetch<Array<{mood: string}>>;
}

const HelloView: React.FC<HelloView> = ({onClick, mood}) => (
  <div>
    <h1>Hello, Again</h1>
    <p>Some things to try next:</p>
    <dl>
      <dt>
        <strong>Talk to the backend</strong>
      </dt>
      <dd>
        <button onClick={onClick}>Talk to the backend</button>
        <pre>
          {isLoading(mood, () => 'loading...')}
          {isBad(mood, (error) => `Unexpected error occurred: ${error}`)}
          {isGood(mood, (data) => JSON.stringify(data))}
        </pre>
      </dd>
      <dt>
        <strong>Typecheck</strong>
      </dt>
      <dd>
        Run <code>yarn typecheck:watch</code> or <code>yarn tw</code> (<em>ooh, aah</em>){' '}
      </dd>
      <dt>
        <strong>Hot module reloading</strong>
      </dt>
      <dd>
        Modify <code>src/components/hello.tsx</code> and watch the changes happen live here{' '}
      </dd>
      <dt>
        <strong>Continuous integration</strong>
      </dt>
      <dd>Push to a GitHub repo to run the Action </dd>
      <dt>
        <strong>Heroku</strong>{' '}
      </dt>
      <dd>
        Deploy to Heroku with <code>./vendor/heroku [name of heroku app]</code>{' '}
      </dd>
      <dt>
        <strong>Set up Google Analytics and Sentry</strong>
      </dt>
      <dd>
        Set <code>GA_MEASUREMENT_ID</code> and <code>SENTRY_LAZY_LOADER_URL</code> in your{' '}
        <code>packages/frontend/.env</code>. For more information, see{' '}
        <a href="https://github.com/Originate/create-originate-app/blob/master/ANALYTICS.md">ANALYTICS.md</a>.
      </dd>
      <dt>
        <strong>Check out our module system</strong>
      </dt>
      <dd>
        A module is a React component coupled with its own state and reducer. Here is a counter implemented out of{' '}
        <code>./modules/counter</code>:
        <Counter />
      </dd>
    </dl>
  </div>
);

export const Hello: React.FC<{}> = () => {
  const store = useStore().hello;
  const dispatch = useDispatch();
  return <HelloView onClick={dispatch.hello.onClick} mood={store.mood} />;
};

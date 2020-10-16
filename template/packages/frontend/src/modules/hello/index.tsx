import * as React from 'react';
import styled from 'styled-components';

import {Fetch, isGood, isBad, isLoading} from '@/frontend/src/lib';
import {useStore, useDispatch} from '@/frontend/src/components/contexts';

import {Counter} from '@/frontend/src/modules/counter';
import {AuthDemo} from '@/frontend/src/modules/authDemo';

interface HelloView {
  onClick: () => void;
  mood?: Fetch<{mood: string}>;
}

const Term = styled.dt`
  font-weight: bold;
`;

const HelloView: React.FC<HelloView> = ({onClick, mood}) => (
  <div>
    <h1>Hello, Again</h1>
    <p>Some things to try next:</p>
    <dl>
      <Term>Talk to the backend</Term>
      <dd>
        <button onClick={onClick}>Talk to the backend</button>
        <pre>
          {isLoading(mood, () => 'loading...')}
          {isBad(mood, (error) => `Unexpected error occurred: ${error}`)}
          {isGood(mood, (data) => JSON.stringify(data))}
        </pre>
      </dd>
      <Term>Typecheck</Term>
      <dd>
        Run <code>yarn typecheck:watch</code> or <code>yarn tw</code> (<em>ooh, aah</em>)
      </dd>
      <Term>Hot module reloading</Term>
      <dd>
        Modify <code>src/components/hello.tsx</code> and watch the changes happen live here
      </dd>
      <Term>Continuous integration</Term>
      <dd>Push to a GitHub repo to run the Action </dd>
      <Term>Heroku </Term>
      <dd>
        Deploy to Heroku with <code>./vendor/heroku [name of heroku app]</code>
      </dd>
      <Term>Set up Google Analytics and Sentry</Term>
      <dd>
        Set <code>GA_MEASUREMENT_ID</code> and <code>SENTRY_LAZY_LOADER_URL</code> in your{' '}
        <code>packages/frontend/.env</code>. For more information, see{' '}
        <a href="https://github.com/Originate/create-originate-app/blob/master/ANALYTICS.md">ANALYTICS.md</a>.
      </dd>
      <Term>Check out the module system</Term>
      <dd>
        A module is a React component coupled with its own state and reducer. Here is a counter implemented out of{' '}
        <code>./modules/counter</code>:
        <Counter />
      </dd>
      <Term>Check out the authentication system</Term>
      <dd>
        <AuthDemo />
      </dd>
    </dl>
  </div>
);

export const Hello: React.FC<{}> = () => {
  const store = useStore().hello;
  const dispatch = useDispatch();
  return <HelloView onClick={dispatch.hello.onClick} mood={store.mood} />;
};

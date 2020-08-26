import * as React from 'react';
import {router} from '@/lib';

const HelloView = ({onClick, moods}: {onClick: () => void; moods?: Array<{mood: string}>}) => (
  <div>
    <h1>Hello, Again</h1>
    <p>Some things to try next:</p>
    <dl>
      <dt>
        <strong>Talk to the backend</strong>
      </dt>
      <dd>
        <button onClick={onClick}>Talk to the backend</button>
        <pre>{moods ? (moods.length ? JSON.stringify(moods) : 'loading...') : '...'}</pre>
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
    </dl>
  </div>
);

export const Hello: React.FC<{}> = () => {
  const [moods, setMoods] = React.useState<{mood: string}[] | undefined>(undefined);
  const onClick = React.useCallback(() => {
    setMoods([]);
    router.ping
      .client({mood: 'big'})
      .then(setMoods)
      .catch((e) => {
        throw e;
      });
  }, []);
  return <HelloView onClick={onClick} moods={moods} />;
};

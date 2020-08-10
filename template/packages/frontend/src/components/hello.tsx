import * as React from 'react';
import {router} from '@/lib/routes';

const Hello_ = ({onClick, response}: {onClick: () => void; response: object | undefined}) => (
  <div>
    <h1>Hello, Again</h1>
    <p>Some things to try next:</p>
    <dl>
      <dt>
        <strong>Talk to the backend</strong>
      </dt>
      <dd>
        <button onClick={onClick}>Talk to the backend</button>
        <pre>{response ? JSON.stringify(response) : '...'}</pre>
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
    </dl>
  </div>
);

export const Hello = () => {
  const [response, setResponse] = React.useState<{mood: string}[] | undefined>(undefined);
  const onClick = React.useCallback(() => {
    setResponse(undefined);
    router.ping
      .client('big')
      .then(setResponse)
      .catch((e) => {
        throw e;
      });
  }, []);
  return <Hello_ onClick={onClick} response={response} />;
};

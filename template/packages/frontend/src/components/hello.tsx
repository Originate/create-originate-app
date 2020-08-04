import * as React from 'react';

export const Hello = () => (
  <>
    <h1>Hello</h1>
    <p>Some things to try next:</p>
    <ul>
      <li>
        Run <code>yarn typecheck:watch</code> or <code>yarn tw</code> (<em>ooh, aah</em>)
      </li>
      <li>
        Modify <code>src/components/hello.tsx</code> and watch the changes happen live here
      </li>
      <li>Push to a GitHub repo to run the continuous integration</li>
      <li>
        Deploy to Heroku with <code>./vendor/heroku [name of heroku app]</code>
      </li>
    </ul>
  </>
);

import * as React from 'react';
import {isGood, isBad, isLoading} from '@/frontend/lib';
import {useStore, useDispatch} from '@/frontend/src/components/contexts';

import {AuthDemoStore} from './reducer';

const AuthDemoView: React.FC<{
  store: AuthDemoStore;
  onSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
  onLogIn: (e: React.FormEvent<HTMLFormElement>) => void;
}> = ({store, onSignUp, onLogIn}) => (
  <>
    <p>
      <code>create-originate-app</code> comes with a simple stateless authentication system that persists to Postgres.
      For this to work, you will need to run <code>yarn migrate up 100</code> first.
    </p>
    <details>
      <summary>Sign up</summary>
      <pre>
        {isLoading(store.signup, () => 'loading...')}
        {isBad(store.signup, (error) => `Unexpected error occurred: ${error}`)}
        {isGood(store.signup, (data) => JSON.stringify(data, null, 2))}
      </pre>
      <form onSubmit={onSignUp} autoComplete="off">
        <input placeholder="email" type="email" />
        <input placeholder="password" type="password" />
        <input placeholder="confirm" type="password" />
        <input type="submit" value="Sign up" />
      </form>
    </details>
    <details>
      <summary>Log in</summary>
      <pre>
        {isLoading(store.login, () => 'loading...')}
        {isBad(store.login, (error) => `Unexpected error occurred: ${error}`)}
        {isGood(store.login, (data) => JSON.stringify(data, null, 2))}
      </pre>
      <form onSubmit={onLogIn} autoComplete="off">
        <input placeholder="email" type="email" />
        <input placeholder="password" type="password" />
        <input type="submit" value="Log in" />
      </form>
    </details>
  </>
);

export const AuthDemo: React.FC<{}> = () => {
  const store = useStore().authDemo;
  const dispatch = useDispatch();
  return (
    <AuthDemoView
      store={store}
      onSignUp={async (e) => {
        e.preventDefault();
        const [email, password, confirm] = (Array.from(e.currentTarget.elements) as unknown) as HTMLInputElement[];
        await dispatch.authDemo.onSignUp(email.value, password.value, confirm.value);
      }}
      onLogIn={async (e) => {
        e.preventDefault();
        const [email, password] = (Array.from(e.currentTarget.elements) as unknown) as HTMLInputElement[];
        await dispatch.authDemo.onLogIn(email.value, password.value);
      }}
    />
  );
};

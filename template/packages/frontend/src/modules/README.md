### what are modules?

Our goal with modules is to have pieces of the codebase in directories that are easily deletable. That may sound unusual, but it's common in large React codebases to have the code related to a feature ticket sprawl across several directories and layers of the architecture, which not only makes it tedious to write but also tedious to code review, refactor, maintain, and (possibly eventually) delete. It would be, lovely, for example, to have the demo "Counter" module deletable simply by removing its directory from the list of modules. (We aren't quite there yet, due to the limitations of the TypeScript compiler, but we are close.)

### what can modules do?

Right now, the codebase has softly magical code to automatically import the reducer and the initial store you write in your `./<module name here>/reducer.ts` file into the global (store, reducer) system. You can read the Counter module as a simple demonstration of the ability. You still need to manually update the type of the global store and its actions (see `src/store/types`) as well as importing your module's dispatch methods into `src/dispatch/index.ts`, but that should be about it.

### what would be a good fit as a module?

Any additions to the store that would introduce a new key off of the global `Store` type should probably be a module. For example, we might model a full-featured authentication scheme as a module like this:

- `./auth/reducer.ts` containing

  - An initial store (to represent an unauthenticated user)

  - A reducer that handles user signup, login, and logout

  - A dispatch factory to make actions that model the POSTs to the backend

    - `./auth/reducer.test.ts` to test all the pure code that you wrote above

- `./auth/business-logic.ts` to maybe handle password lengths and restrictions, expiration dates, token refreshing, etc.

    - `./auth/business-logic.test.ts` to test that code as well
    
- `./auth/types.ts` to contain the enumeration of Action types as well as any intermediary types you may need

The resulting store would look like:

```tsx
interface Store {
  auth: AuthStore;
  // ...
}

interface Avatar {
  url: string;
  size: [number, number];
}

interface Session {
  userID: string;
  token: string;
  expiresAt: Date;
  refreshToken: string;
}

interface AuthStore {
  session?: Session;
  avatar?: Avatar;
}
```

### should everything be a module?

Probably you will want to end up with something like

- `./pages` for top-level components connected to a router library (where each "page" corresponds to a route)
- `./src/components` for reusable components

The Counter module comes with a React component, but only so that it is easy to delete once you no longer need it. Depending on your personal preferences, you may or may not store React components in the module directories. Certain modules will have a direct 1-1 correspondence with a single React component (like Hello, and Counter), but most will not. We, at the present time, don't think create-originate-app should care too too much about the filesystem hierarchy.

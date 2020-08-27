/*
 * This file does the work of combineReducers from redux, but allows us to avoid the boilerplate by assuming that every module exports initialStore and reducer.
 */

const safelyAccess = (module, exportName, filename) => {
  if (exportName in module) {
    return module[exportName];
  } else {
    throw new Error(
      `reducer/reducer: ${filename} is missing "${exportName}". our magic reducer combiner depends on an export of "${exportName}"`,
    );
  }
};

const moduleNameOf = (filename) => filename.split('/')[1];

const ctx = require.context('@/frontend/modules', true, /reducer.ts/);
const modules = ctx.keys().map((filename) => [
  moduleNameOf(filename),
  {
    reducer: safelyAccess(ctx(filename), 'reducer', filename),
    initialStore: safelyAccess(ctx(filename), 'initialStore', filename),
  },
]);

export const initialStore = () => {
  const initial = {};
  for (const [key, module] of modules) {
    initial[key] = module.initialStore;
  }
  return initial;
};

export const reducer = (prev, action) => {
  const next = {...prev};
  for (const [key, module] of modules) {
    next[key] = module.reducer(next[key], action);
  }
  return next;
};

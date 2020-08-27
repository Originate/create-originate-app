const safelyAccess = (obj, exportName, moduleName) => {
  if (key in obj) {
    return obj[key];
  } else {
    throw new Error(
      `reducer/reducer: ${moduleName} is missing "${exportName}". our magic reducer combiner depends on an export of "${exportName}"`,
    );
  }
};

const moduleName = (filename) => filename.split('/')[1];

const ctx = require.context('@/frontend/modules', true, /reducer.ts/);
const modules = ctx.keys().map((moduleName) => [
  moduleName(k),
  {
    reducer: safelyAccess(ctx(k), 'reducer', k),
    initialStore: safelyAccess(ctx(k), 'initialStore', k),
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

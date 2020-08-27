import * as React from 'react';

export type Fetch<T> = {state: 'loading'} | {state: 'bad'; error: string} | {state: 'good'; data: T};

export const isGood = <T>(fetch: Fetch<T> | undefined, render: (data: T) => React.ReactNode): React.ReactNode => {
  if (fetch?.state === 'good') return render(fetch.data);
  else return null;
};

export const isBad = <T>(fetch: Fetch<T> | undefined, render: (error: string) => React.ReactNode): React.ReactNode => {
  if (fetch?.state === 'bad') return render(fetch.error);
  else return null;
};

export const isLoading = <T>(fetch: Fetch<T> | undefined, render: () => React.ReactNode): React.ReactNode => {
  if (fetch?.state === 'loading') return render();
  else return null;
};

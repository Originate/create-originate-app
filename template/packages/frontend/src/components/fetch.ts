import * as React from 'react';
export type {Fetch} from '@/frontend/src/store';
import {Fetch} from '@/frontend/src/store';

export const good = <T>(fetch: Fetch<T> | undefined, render: (data: T) => React.ReactNode): React.ReactNode => {
  if (fetch?.state === 'good') return render(fetch.data);
  else return null;
};

export const bad = <T>(fetch: Fetch<T> | undefined, render: (error: string) => React.ReactNode): React.ReactNode => {
  if (fetch?.state === 'bad') return render(fetch.error);
  else return null;
};

export const loading = <T>(fetch: Fetch<T> | undefined, render: () => React.ReactNode): React.ReactNode => {
  if (fetch?.state === 'loading') return render();
  else return null;
};

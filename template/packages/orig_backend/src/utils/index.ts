export {makeExpress} from '@/backend/src/utils/express';

export const delay = async (seconds: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(void 0), seconds * 1000);
  });

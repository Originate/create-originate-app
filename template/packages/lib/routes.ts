import * as Router from '@Originate/leash';

export const router = {
  ping: Router.get<{mood: string}, string>('/api/ping', (mood) => `/api/ping?mood=${mood}`),
};

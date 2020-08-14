import * as Router from '@Originate/leash';

export const router = {
  ping: Router.get<{mood: string}, {mood: string}>('/api/ping', ({mood}: {mood: string}) => `/api/ping?mood=${mood}`),
};

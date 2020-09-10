import * as Router from '@Originate/leash';
import * as Auth from '@/auth';

export interface UserSignup {
  name: string;
}

export interface User extends UserSignup {
  occupation: string;
}

export const authRouter = Auth.makeRouter<UserSignup, User>();

export const router = {
  ...authRouter,
  ping: Router.get<{mood: string}, {mood: string}>('/api/ping', ({mood}: {mood: string}) => `/api/ping?mood=${mood}`),
};

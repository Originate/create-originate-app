/// This library implements a stateless authentication scheme based on JSON
/// tokens. Once logged in, web and mobile clients should pass the JSON token
/// via an `Authorization: Bearer <token>` header. To prevent CSRF attacks,
/// place all endpoints that mutate the backend's state behind an Authorization
/// header check.

import * as Router from '@Originate/leash';

export * from './lib/backend';
export * from './lib/decoders';
import * as types from './lib/types';

//////////////////////////////////////// The rest

export function makeRouter<TSignup, TLogin>() {
  return {
    signup: Router.post<types.SignupResponse, types.SignupRequest<TSignup>>('/api/auth/signup'),
    login: Router.post<types.LoginResponse<TLogin>, types.LoginRequest>('/api/auth/login'),
    password: Router.put<types.PasswordResponse, types.PasswordRequest>('/api/auth/password'),
    ['password-reset']: Router.post<types.PasswordResetResponse, types.PasswordResetRequest>(
      '/api/auth/password-reset',
    ),
  };
}

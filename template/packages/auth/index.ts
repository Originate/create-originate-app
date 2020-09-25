/// This library implements a stateless authentication scheme based on JSON
/// tokens. Once logged in, web and mobile clients should pass the JSON token
/// via an `Authorization: Bearer <token>` header. To prevent CSRF attacks,
/// place all endpoints that mutate the backend's state behind an Authorization
/// header check.

import * as Router from '@Originate/leash';

export * from './lib/backend';
export * from './lib/decoders';
export * from './lib/types';
import * as types from './lib/types';

//////////////////////////////////////// The rest

export function makeRouter<TSignup, TLogin>() {
  return {
    signup: Router.post<types.SignupRequest<TSignup>, types.SignupResponse>('/api/auth/signup'),
    login: Router.post<types.LoginRequest, types.LoginResponse<TLogin>>('/api/auth/login'),
    password: Router.put<types.PasswordRequest, types.PasswordResponse>('/api/auth/password'),
    passwordReset: Router.post<types.PasswordResetRequest, types.PasswordResetResponse>('/api/auth/password-reset'),
  };
}

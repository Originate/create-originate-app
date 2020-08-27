import * as D from 'io-ts/lib/Decoder';

import {LoginRequest, SignupRequest, PasswordResetRequest, PasswordRequest} from './types';

export const loginRequestDecoder: D.Decoder<unknown, LoginRequest> = D.type({
  id: D.string,
  password: D.string,
});

export function signupRequestDecoder<TUser>(
  userDecoder: D.Decoder<unknown, TUser>,
): D.Decoder<unknown, SignupRequest<TUser>> {
  return D.type({
    user: userDecoder,
    password: D.string,
  });
}

export const passwordResetRequestDecoder: D.Decoder<unknown, PasswordResetRequest> = D.type({
  id: D.string,
});

export const passwordRequestDecoder: D.Decoder<unknown, PasswordRequest> = D.type({
  token: D.string,
  password: D.string,
});

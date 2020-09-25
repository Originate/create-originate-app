import * as D from 'io-ts/lib/Decoder';
import {isLeft} from 'fp-ts/lib/Either';
import {Request, Response} from 'express';

import {Result, bad, good} from '@Originate/leash';
import * as types from './types';
import * as decoders from './decoders';

export interface AuthStrategy<TSignup, TUser> {
  signupDecoder: D.Decoder<unknown, TSignup>;
  createUser(
    user: TSignup,
    passwordDigest: Buffer,
  ): Promise<{ok: true; id: string} | {ok: false; key: string; error: string}>;
  authenticate(id: string): Promise<{ok: true; passwordDigest: Buffer; user: TUser} | {ok: false}>;
}

export interface AuthCrypto {
  mintSessionToken(id: string, expiration: {days: number}): string;
  passwordKeyDerive(password: string): Promise<Buffer>;
  verifyPassword(pair: {plaintext: string; digest: Buffer}): Promise<boolean>;
}

type ValidatedControllerMethod<EndpointArg, RequestType, RouteResult> = (
  payload: EndpointArg,
  req: RequestType,
  res: Response,
) => Promise<Result<RouteResult>>;

function withValidation<EndpointArg, RequestKind extends Request, RouteResult>(
  decoder: D.Decoder<EndpointArg, EndpointArg>,
  endpoint: ValidatedControllerMethod<EndpointArg, RequestKind, RouteResult>,
) {
  return async (req: RequestKind, res: Response) => {
    const result = decoder.decode(req.body);
    if (isLeft(result)) return bad(400, D.draw(result.left));
    else return endpoint(result.right, req, res);
  };
}

export class AuthController<TSignup, TUser> {
  constructor(private strategy: AuthStrategy<TSignup, TUser>, private crypto: AuthCrypto) {}

  loginPOST = withValidation(
    decoders.loginRequestDecoder,
    async (req): Promise<Result<types.LoginResponse<TUser>>> => {
      const result = await this.strategy.authenticate(req.id);
      if (result.ok && (await this.crypto.verifyPassword({plaintext: req.password, digest: result.passwordDigest}))) {
        return good({
          ok: true,
          id: req.id,
          user: result.user,
          token: this.crypto.mintSessionToken(req.id, {days: 3}),
        });
      } else {
        return bad(400, 'unauthorized', 'Incorrect username or password');
      }
    },
  );

  signupPOST = withValidation(
    decoders.signupRequestDecoder(this.strategy.signupDecoder),
    async (req): Promise<Result<types.SignupResponse>> => {
      const digest = await this.crypto.passwordKeyDerive(req.password);
      const result = await this.strategy.createUser(req.user, digest);
      if (result.ok) {
        return good({ok: true, id: result.id});
      } else {
        return bad(400, result.key, result.error);
      }
    },
  );

  passwordResetPOST = withValidation(
    decoders.passwordResetRequestDecoder,
    async (req): Promise<Result<types.PasswordResetResponse>> => {
      console.debug('>>>>>>>>>>>>', req);
      return bad(400, 'unauthorized');
    },
  );

  passwordPUT = withValidation(
    decoders.passwordRequestDecoder,
    async (req): Promise<Result<types.PasswordResponse>> => {
      console.debug('>>>>>>>>>>>>', req);
      return bad(400, 'unauthorized');
    },
  );

  ////////////////////////////////////////
  // Ergonomics: use this with `installMany` from `@Originate/leash`
  routes = {
    login: this.loginPOST,
    signup: this.signupPOST,
    password: this.passwordPUT,
    passwordReset: this.passwordResetPOST,
  };
}

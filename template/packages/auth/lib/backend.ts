import * as D from 'io-ts/lib/Decoder';
import {isLeft} from 'fp-ts/lib/Either';
import {Request, Response} from 'express';

import {Result, bad} from '@Originate/leash';
import * as types from './types';
import * as decoders from './decoders';

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
  constructor(private signupDecoder: D.Decoder<unknown, TSignup>) {}

  loginPOST = withValidation(
    decoders.loginRequestDecoder,
    async (req): Promise<Result<types.LoginResponse<TUser>>> => {
      console.debug('>>>>>>>', req);
      return bad(400, 'unauthorized');
    },
  );

  signupPOST = withValidation(
    decoders.signupRequestDecoder(this.signupDecoder),
    async (req): Promise<Result<types.LoginResponse<TSignup>>> => {
      console.debug('>>>>>>>>>>>>', req);
      return bad(400, 'unauthorized');
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
}

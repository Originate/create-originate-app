//////////////////////////////////////// Signup

export interface SignupRequest<TUser> {
  user: TUser;
  password: string;
}

export interface SignupGood {
  ok: true;
  id: string;
}

export type SignupBad = {ok: false; key: string; error: string};

export type SignupResponse = SignupGood | SignupBad;

//////////////////////////////////////// Login

export interface LoginRequest {
  id: string;
  password: string;
}

export interface LoginGood<TUser> {
  ok: true;
  id: string;
  user: TUser;
  token: string;
}

export type LoginBad = {ok: false; key: string; error: string};

export type LoginResponse<TUser> = LoginGood<TUser> | LoginBad;

//////////////////////////////////////// Password reset

export interface PasswordResetRequest {
  id: string;
}

export type PasswordResetResponse = {ok: true} | {ok: false; key: string; error: string};

export interface PasswordRequest {
  token: string;
  password: string;
}

export type PasswordResponse = {ok: true} | {ok: false; key: string; error: string};

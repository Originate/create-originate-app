## the package tentatively titled "@Originate/auth"

This package builds on top of `@Originate/leash` to provide endpoints that implement a common user-password authentication scheme on user-facing websites. The endpoints are documented below.

### POST `/api/auth/login`

``` tsx
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
```

Returns a stateless JWT token on success. This token, which will be a short alphanumeric string, authenticates further HTTP requests to the backend. Send it via an `Authorization: Bearer <token>` header. Tokens expire after a certain interval, which can be configured when the endpoints are installed (in the `@Originate/leash` sense of the word "install"). Tokens are stateless, meaning they are not stored in the backend. They are, instead, generated from an authenticated hash of the user's secret password, keyed off a key provided to the backend via its environment variables.

### POST `/api/auth/signup`

``` tsx
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
```

Creates a user account. The consumer of this library can decide what type the user object should be via a generic parameter `TUser`. For example, one app might want (full name, address, social-security number). Another app might want (Twitch username, Twitter username, Battle.net username). Along with providing a custom type, this library's consumers should also implement an `io-ts` Decoder for the type, so that the library can validate and parse incoming user objects.

It is required to send an `Authorization: Bearer signup` header along with this request. We treat "signup" as a temporary token that authenticates an anonymous request (users who are signing up have yet to authenticate with the backend, because they are unable to yet, so they are effectively anonymous) and authorizes the request to access exactly one endpoint, which is this one, the signup endpoint. This requirement prevents trivial CSRF attacks.


### POST `/api/auth/password-reset`

``` tsx
export interface PasswordResetRequest {
  id: string;
}

export type PasswordResetResponse = {ok: true} | {ok: false; key: string; error: string};
```

Initiates the password-reset flow. The backend will send a one-time password-reset token along a trusted communicaton channel (usually email). The library's consumer should then implement a user-facing frontend route that is able to send that token to the endpoint below, along with a new password.

### PUT `/api/auth/password`

``` tsx
export interface PasswordRequest {
  token: string;
  password: string;
}

export type PasswordResponse = {ok: true} | {ok: false; key: string; error: string};
```

A successful invocation of this endpoint will "use up" the password-reset token, and render that token useless.

### Keyed errors

Errors from these endpoints are *keyed*, meaning they include a human-friendly English error string as well as a short, symbolic string for the frontend to test on. For example, `{ok: false, key: "passwordTooShort", error: "Passwords must be at least 10 characters long."}`.

### Persistent storage

For this library to work, it needs to read and write from persistent storage. The library's users are asked to implement the following interface, and to pass it into the library during endpoint installation.

``` tsx
// This interface is tentative
interface Persistent<TSignup, TLogin> {
  async createID(signup: TSignup): Promise<TSignup>
  async authenticateID(id: string, password: string): Promise<TLogin | 'missing' | 'rate-limited'>
  async findID(id: string): Promise<TLogin | 'missing'>
  async resetID(id: string, password: string): Promise<'ok' | 'missing'>
}
```

The interface is designed so that these functions are simple enough to implement with one or two SQL queries.

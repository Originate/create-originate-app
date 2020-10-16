// import { LoginResponse, SignupResponse } from "@/auth"
import { ActionOf, Fetch } from "@/frontend/src/lib"
import { IDispatch } from "@/frontend/src/store"
// import { router, User } from "@/lib"

// TODO: get imports from @/lib and @/auth working again
type LoginResponse<_T> = any
type SignupResponse = any
type User = any

export type AuthDemoStore = {
  signup?: Fetch<{}>
  login?: Fetch<{}>
}

export type AuthDemoAction =
  | ActionOf<"authDemo/signUp", Fetch<SignupResponse>>
  | ActionOf<"authDemo/logIn", Fetch<LoginResponse<User>>>

export const initialStore: AuthDemoStore = {}

export const reducer = (
  prev: AuthDemoStore,
  action: AuthDemoAction,
): AuthDemoStore => {
  switch (action.key) {
    case "authDemo/signUp":
      return { ...prev, signup: action }
    case "authDemo/logIn":
      return { ...prev, login: action }
    default:
      return prev
  }
}

// TODO: get imports from @/lib and @/auth working again
export function dispatch(this: IDispatch) {
  return {
    onSignUp: async (_email: string, _password: string, _confirm: string) => {
      // if (password === confirm && password.length >= 10) {
      //   try {
      //     this.dispatch({ key: "authDemo/signUp", state: "loading" })
      //     const result = await router.signup.client({
      //       user: { email, name: "howdy" },
      //       password,
      //     })
      //     this.dispatch({ key: "authDemo/signUp", state: "good", data: result })
      //   } catch (e) {
      //     this.dispatch({
      //       key: "authDemo/signUp",
      //       state: "bad",
      //       error: e.toString(),
      //     })
      //   }
      // } else if (password !== confirm) {
      //   this.dispatch({
      //     key: "authDemo/signUp",
      //     state: "bad",
      //     error: "Password and confirmation do not match",
      //   })
      // } else if (password.length < 10) {
      //   this.dispatch({
      //     key: "authDemo/signUp",
      //     state: "bad",
      //     error:
      //       "Password must be at least 10 characters, even for a silly demo",
      //   })
      // }
    },
    onLogIn: async (_email: string, _password: string) => {
      // try {
      //   this.dispatch({ key: "authDemo/logIn", state: "loading" })
      //   const result = await router.login.client({ id: email, password })
      //   this.dispatch({ key: "authDemo/logIn", state: "good", data: result })
      // } catch (e) {
      //   this.dispatch({
      //     key: "authDemo/logIn",
      //     state: "bad",
      //     error: e.toString(),
      //   })
      // }
    },
  }
}

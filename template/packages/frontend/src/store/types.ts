import * as counterModule from "../modules/counter/reducer"
import * as helloModule from "../modules/hello/reducer"
import * as authDemoModule from "../modules/authDemo/reducer"

export type Store = {
  hello: helloModule.HelloStore
  counter: counterModule.CounterStore
  authDemo: authDemoModule.AuthDemoStore
}

export type Action =
  | counterModule.CounterAction
  | helloModule.HelloAction
  | authDemoModule.AuthDemoAction

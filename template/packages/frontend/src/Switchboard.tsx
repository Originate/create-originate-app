import * as React from "react"
import { FC, useReducer, useState } from "react"
import { DispatchContext, StoreContext } from "./components/contexts"
import { Dispatch } from "./dispatch"
import { Env } from "./env"
import { Hello } from "./modules/hello"
import { initialStore, reducer, Store } from "./store"

const Contextually: FC<{
  dispatch: Dispatch
  store: Store
  children: React.ReactNode
}> = ({ dispatch, store, children }) => (
  <StoreContext.Provider value={store}>
    <DispatchContext.Provider value={dispatch}>
      {children}
    </DispatchContext.Provider>
  </StoreContext.Provider>
)

export const Switchboard: FC<{ env: Env }> = ({ env }) => {
  React.useEffect(() => {
    console.log("Environment loaded:", env)
  }, [env])

  const [store, reactDispatch] = useReducer(reducer, initialStore())
  const [dispatch] = useState(new Dispatch(reactDispatch))
  return (
    <Contextually dispatch={dispatch} store={store}>
      <Hello />
    </Contextually>
  )
}

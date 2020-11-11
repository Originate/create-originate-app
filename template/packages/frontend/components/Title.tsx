import * as React from "react"
import styles from "./title.module.css"

type Props = {
  children: React.ReactNode
}

const Title = ({ children }: Props) => {
  return (
    <div>
      <h2 className={styles.title}>{children}</h2>
    </div>
  )
}

export default Title

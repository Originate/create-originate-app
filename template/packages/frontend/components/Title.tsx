import * as React from "react"
import styles from "./title.module.css"

type Props = {
  text: string
}

const Title = ({ text }: Props) => {
  return (
    <div>
      <h2 className={styles.title}>{text}</h2>
    </div>
  )
}

export default Title

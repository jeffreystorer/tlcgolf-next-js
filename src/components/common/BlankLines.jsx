import React from "react"
import { v4 as uuidv4 } from "uuid"

export default function BlankLines({ lines }) {
  const LineBreaks = () => {
    return new Array(lines).fill(undefined).map((x) => <br key={uuidv4()} />)
  }
  return (
    <>
      <LineBreaks />
    </>
  )
}

import React from "react"
export default function TitledBox(props) {
  return (
    <>
      <div className="titled_box">
        <div className="title">{props.title}</div>
        <div className="content">{props.children}</div>
      </div>
    </>
  )
}

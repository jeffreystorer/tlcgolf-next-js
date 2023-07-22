import React from "react"
import Textarea from "react-expanding-textarea"

const ExportTextarea = ({ textareaValue }) => {
  return (
    <>
      <Textarea
        className="textarea"
        cols="41"
        value={textareaValue}
        readOnly={true}
      />
    </>
  )
}

export default ExportTextarea

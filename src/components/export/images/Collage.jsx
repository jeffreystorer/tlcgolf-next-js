import React, { forwardRef } from "react"

const Collages = forwardRef(({ pdfLoading, PCCollage, styleDims }, ref) => {
  return (
    <>
      {pdfLoading ? (
        <p> Loading . . .</p>
      ) : (
        <>
          <div className="background-white center">
            <h1>PLEASE IGNORE THE COLLAGE BELOW.</h1>
            <h1>IT IS USED FOR CREATING THE PDF.</h1>
          </div>
          <div
            ref={ref}
            id="div_collage"
            className="center"
            style={{
              width: styleDims[0],
              height: styleDims[1],
            }}
          >
            <PCCollage />
          </div>
        </>
      )}
    </>
  )
})
export default Collages

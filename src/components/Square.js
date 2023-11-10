import React from "react"

const Square = (props) => {
  const handleClick = () => {
    if (!props.endGame) {
      props.clickOnBoard(props.index)
      props.counter()
    } else {
      props.clickOnBoard(null)
    }
  }

  return (
    <>
      <div className="square" onClick={handleClick}>
        {props.val}
      </div>
    </>
  )
}
export default Square

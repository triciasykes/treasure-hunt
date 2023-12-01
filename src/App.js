import React, { useState } from "react"

import Sidebar from "./components/Sidebar"
import Square from "./components/Square"

import "./App.css"

const App = () => {
  const starterBoard = ["?", "?", "?", "?", "?", "?", "?", "?", "?"]
  const [board, setBoard] = useState(starterBoard)

  // add treasureLocation and bombLocation as state variables. They will each hold an index.
  // Because we want both to be random, we set initial state to be a random number. These need to be separate random numbers, so creating a variable to hold the value will make treasure and bomb location the same.
  const [treasureLocation, setTreasureLocation] = useState(
    Math.floor(Math.random() * board.length)
  )
  const [bombLocation, setBombLocation] = useState(
    Math.floor(Math.random() * board.length)
  )

  const [count, setCount] = useState(5)
  const [message, setMessage] = useState("Treasure Hunt")
  const [endGame, setEndGame] = useState(false)

  // need to use setBoard to update state with the current index
  //  functional props -> to get index of clicked square
  // we create a fxn in App.js that can be called in Square.js
  // then we have access to the index that is passed into the fxn  when it's called in Square

  const clickOnBoard = (clickedSquare) => {
    // # copies the board so we can use copy to update state
    let updateBoard = [...board]
    // is the clicked index the same as random index for Treasure?
    if (clickedSquare === treasureLocation) {
      // then change value of the square that was clicked from question mark to a jewel
      updateBoard[clickedSquare] = "💎"
      // and reset the board to include the new image
      setBoard(updateBoard)
      setMessage("SWEET! YOU WIN!")
      setEndGame(true)
      setCount(null)
      // same process for the Bomb
    } else if (clickedSquare === bombLocation) {
      updateBoard[clickedSquare] = "💣"
      setBoard(updateBoard)
      setMessage("BOO, YOU LOST!")
      setEndGame(true)
      setCount(null)
    } else {
      // otherwise give square the game's main image
      updateBoard[clickedSquare] = "🐷"
      setBoard(updateBoard)
    }
  }

  // create fxn for the play again onClick event
  const restartGame = () => {
    // returns board to initial state
    setBoard(starterBoard)
    // sets treasure at new index
    setTreasureLocation(Math.floor(Math.random() * board.length))
    // sets bomb at new index
    setBombLocation(Math.floor(Math.random() * board.length))
    setCount(5)
    setMessage("Treasure Hunt")
    setEndGame(false)
  }

  // create fxn to decrement count by 1 & pass to Square to be called in handleClick
  const counter = () => {
    let currentCount = count - 1
    if (currentCount === 0) {
      setEndGame(true)
      setMessage("Out of Turns!")
      setCount(0)
    } else {
      setCount(currentCount)
    }
  }

  return (
    <>
      <div className="message">{message}</div>
      <div className="wrapper">
        <Sidebar />
        <div className="board">
          {board.map((value, index) => {
            return (
              <Square
                val={value}
                index={index}
                clickOnBoard={clickOnBoard}
                counter={counter}
                endGame={endGame}
                key={index}
              />
            )
          })}
        </div>
        <Sidebar />
      </div>
      <div className="spacer">
        <button className="play-again" onClick={restartGame}>
          Play Again!
        </button>
        <div className="counter">
          Turns Remaining:<div className="count-number">{count}</div>{" "}
        </div>
      </div>
    </>
  )
}

export default App

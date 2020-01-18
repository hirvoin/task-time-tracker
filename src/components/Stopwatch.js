import React, { useState } from "react"
import MainButton from "./Button"

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(58)
  const [hours, setHours] = useState(0)

  const handleStart = () => {
    setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds < 60) {
          return prevSeconds + 1
        } else {
          setHours(prevHours => prevHours + 1)
          return setSeconds(0)
        }
      })
    }, 1000)
  }

  const handlePause = () => {
    console.log("pause")
  }

  const handleStop = () => {
    console.log("stop")
  }

  return (
    <div>
      <h3>Stopwatch</h3>
      {hours} hours {seconds} seconds
      <MainButton label="start" handleClick={handleStart} />
      <MainButton label="pause" handleClick={handlePause} />
      <MainButton label="stop" handleClick={handleStop} />
    </div>
  )
}

export default Stopwatch

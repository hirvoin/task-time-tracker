import React, { useContext } from "react"
import { TaskContext } from "../Store"
import { Button } from "@material-ui/core"

const Task = ({ task }) => {
  const { dispatch } = useContext(TaskContext)

  const calculateDuration = () => {
    console.log("calculating duration")
  }

  const handleStart = () => {
    dispatch({
      type: "START_TASK",
      data: task
    })
  }

  const handleStop = () => {
    calculateDuration()
    dispatch({
      type: "STOP_TASK",
      data: task
    })
  }

  return (
    <div>
      <h3 style={{ margin: "10px" }}>{task.title}</h3>
      <p style={{ margin: "10px" }}>{task.description}</p>
      {task.startTime && (
        <p style={{ margin: "10px" }}>start {task.startTime}</p>
      )}
      {task.stopTime && <p style={{ margin: "10px" }}>stop {task.stopTime}</p>}

      <div>
        {!task.startTime && (
          <Button variant="outlined" color="primary" onClick={handleStart}>
            Start
          </Button>
        )}
        {!task.stopTime && task.startTime && (
          <Button variant="outlined" color="secondary" onClick={handleStop}>
            Stop
          </Button>
        )}
      </div>
    </div>
  )
}

export default Task

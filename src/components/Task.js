import React, { useContext } from "react"
import { TaskContext } from "../Store"
import {
  Card,
  Button,
  makeStyles,
  Typography,
  CardActions,
  CardContent
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    margin: theme.spacing(1)
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}))

const Task = ({ task }) => {
  const classes = useStyles()
  const { dispatch } = useContext(TaskContext)

  const calculateDuration = () => {
    const diff = Math.abs(
      (task.stopTime.getTime() - task.startTime.getTime()) / 1000
    )
    const hours = Math.floor(diff / 3600)
    const minutes = Math.floor((diff % 3600) / 60)
    const seconds = Math.floor((diff % 3600) % 60)

    const hDisplay =
      hours > 0 ? hours + (hours === 1 ? " hour, " : " hours, ") : ""
    const mDisplay =
      minutes > 0 ? minutes + (minutes === 1 ? " minute, " : " minutes, ") : ""
    const sDisplay =
      seconds > 0 ? seconds + (seconds === 1 ? " second" : " seconds") : ""
    return hDisplay + mDisplay + sDisplay
  }

  const handleStart = () => {
    const updatedTask = {
      ...task,
      startTime: new Date()
    }
    dispatch({
      type: "START_TASK",
      data: updatedTask
    })
  }

  const handleStop = () => {
    const currentDate = new Date()
    const updatedTask = {
      ...task,
      stopTime: currentDate,
      duration: currentDate.getTime() - task.startTime.getTime()
    }
    dispatch({
      type: "STOP_TASK",
      data: updatedTask
    })
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {task.title}
        </Typography>
        <Typography variant="body2" component="p">
          {task.description}
        </Typography>
        {task.startTime && <p>start {task.startTime.toLocaleTimeString()}</p>}
        {task.stopTime && (
          <div>
            <p>stop {task.stopTime.toLocaleTimeString()}</p>
            Duration {calculateDuration()}
          </div>
        )}
      </CardContent>
      <CardActions>
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
      </CardActions>
    </Card>
  )
}

export default Task

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

  const calculateDuration = (startDate, stopDate) => {
    if (startDate && stopDate) {
      const diff = Math.abs(stopDate.getTime() - startDate.getTime())
      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      return { minutes, seconds, hours }
    }
  }

  const formatDuration = (start, stop) => {
    if (start && stop) {
      return (
        <p>
          {
            (calculateDuration(start, stop).hours + " hours ",
            calculateDuration(start, stop).minutes + " minutes ",
            calculateDuration(start, stop).seconds + " seconds")
          }
        </p>
      )
    }
  }

  const formatTime = time => {}

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

  const borderstyle = task.stopTime ? "solid green" : "solid"
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
            Duration {formatDuration(task.startTime, task.stopTime)}
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

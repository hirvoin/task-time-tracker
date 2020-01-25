import React, { useContext } from "react"
import i18next from "i18next"
import { TaskContext } from "../Store"
import {
  Card,
  Button,
  makeStyles,
  Typography,
  CardActions,
  CardContent,
  Divider
} from "@material-ui/core"
import {
  Done,
  AssignmentTurnedIn,
  PlayArrow,
  CheckCircle,
  DonutLarge,
  PlayCircleOutline,
  Timer
} from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: "275px",
    minHeight: "225px",
    margin: theme.spacing(1)
  },
  title: {
    fontSize: 14
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  finishedIcon: {
    color: theme.palette.success.main
  },
  inProgressIcon: {
    color: theme.palette.warning.light
  },
  notStartedIcon: {},
  timeIcon: {
    marginRight: theme.spacing(1),
    fontSize: 18,
    color: theme.palette.primary.light
  }
}))

const Task = ({ task }) => {
  const classes = useStyles()
  const { dispatch } = useContext(TaskContext)

  const calculateDuration = () => {
    const diff = Math.abs(
      (task.stopTime.getTime() - task.startTime.getTime()) / 1000
    )
    const seconds = Math.floor((diff % 3600) % 60)
    const minutes = Math.floor((diff % 3600) / 60)
    const hours = Math.floor(diff / 3600)

    const hDisplay =
      hours > 0 ? hours + (hours === 1 ? " hour, " : " hours, ") : ""
    const mDisplay =
      minutes > 0 ? minutes + (minutes === 1 ? " minute, " : " minutes, ") : ""
    const sDisplay =
      seconds > 0
        ? seconds + (seconds === 1 ? " second" : " seconds")
        : "1 second"
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
    <Card className={classes.card} elevation={2}>
      <CardContent>
        <div style={{ display: "flex" }}>
          <Typography variant="h5" component="h2" style={{ flexGrow: 1 }}>
            {task.title}
          </Typography>
          {!task.startTime && <DonutLarge color="disabled" />}
          {!task.stopTime && task.startTime && (
            <DonutLarge className={classes.inProgressIcon} />
          )}
          {task.stopTime && <CheckCircle className={classes.finishedIcon} />}
        </div>
        <Typography variant="body2" component="p">
          {task.description}
        </Typography>
        <Divider className={classes.divider} />
        {task.startTime && (
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <PlayCircleOutline className={classes.timeIcon} />
            <p>{i18next.t("key", { date: task.startTime })}</p>
          </div>
        )}
        {task.stopTime && (
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <AssignmentTurnedIn className={classes.timeIcon} />
              {i18next.t("key", { date: task.stopTime })}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Timer className={classes.timeIcon} />
              <p>{calculateDuration()}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardActions>
        {!task.startTime && (
          <Button
            color="primary"
            startIcon={<PlayArrow />}
            onClick={handleStart}
          >
            Start task
          </Button>
        )}
        {!task.stopTime && task.startTime && (
          <Button startIcon={<Done />} onClick={handleStop}>
            Finish task
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Task

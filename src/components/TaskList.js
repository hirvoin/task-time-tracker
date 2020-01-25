import React, { useContext } from "react"
import { TaskContext } from "../Store"
import Task from "./Task"
import { Grid, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(5)
  },
  grid: {
    margin: theme.spacing(3)
  }
}))

const TaskList = () => {
  const { tasks } = useContext(TaskContext)
  const classes = useStyles()

  if (!tasks) return null

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={3} cols={3}>
        {tasks
          .filter(t => t.visible)
          .map(t => (
            <Grid item key={t.id}>
              <Task task={t} />
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

export default TaskList

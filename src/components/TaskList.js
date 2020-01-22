import React, { useContext } from "react"
import { TaskContext } from "../Store"
import Task from "./Task"
import { Grid, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3)
  }
}))

const TaskList = () => {
  const { tasks } = useContext(TaskContext)
  const classes = useStyles()
  console.log("Task list:", tasks)

  if (!tasks) return null

  return (
    <div className={classes.root}>
      {/* <Typography variant="h4">Task List</Typography> */}
      <Grid container cols={3}>
        {tasks
          .filter(t => t.visible)
          .map(t => (
            <Grid key={t.id}>
              <Task task={t} />
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

export default TaskList

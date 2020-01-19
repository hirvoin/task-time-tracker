import React, { useContext } from "react"
import { TaskContext } from "../Store"
import Task from "./Task"
import { Grid, Typography } from "@material-ui/core"

const TaskList = () => {
  const { tasks } = useContext(TaskContext)
  console.log("Task list:", tasks)

  if (!tasks) return null

  return (
    <div>
      <Typography variant="h4">Task List</Typography>
      <Grid container cols={3}>
        {tasks.map(t => (
          <Grid key={t.id}>
            <Task task={t} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default TaskList

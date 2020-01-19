import React, { useState, useContext } from "react"
import uuid from "uuid"
import { TaskContext } from "../Store"
import { Button, TextField, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  }
}))

const NewTaskForm = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const tasks = useContext(TaskContext)

  const handleSubmit = event => {
    event.preventDefault()
    tasks.dispatch({
      type: "ADD_TASK",
      data: { id: uuid(), title, description, dateAdded: new Date() }
    })
  }

  const classes = useStyles()

  return (
    <div>
      <Typography variant="h4">Add a new task</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          variant="outlined"
          name="taskTitle"
          label="Task title"
          type="text"
          placeholder="Title"
          onChange={event => setTitle(event.target.value)}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Task Description"
          name="taskDescription"
          type="text"
          placeholder="Description"
          onChange={event => setDescription(event.target.value)}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add new task
        </Button>
      </form>
    </div>
  )
}

export default NewTaskForm

import React, { useState, useContext } from "react"
import uuid from "uuid"
import { TaskContext } from "../Store"
import { Button, TextField, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3)
  },
  textField: {
    margin: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  }
}))

const initialState = ""

const NewTaskForm = () => {
  const [title, setTitle] = useState(initialState)
  const [description, setDescription] = useState(initialState)

  const tasks = useContext(TaskContext)

  const handleSubmit = event => {
    event.preventDefault()
    tasks.dispatch({
      type: "ADD_TASK",
      data: {
        id: uuid(),
        title,
        description,
        dateAdded: new Date(),
        visible: true
      }
    })
    setTitle(initialState)
    setDescription(initialState)
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          variant="outlined"
          name="taskTitle"
          label="Title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <TextField
          value={description}
          className={classes.textField}
          variant="outlined"
          label="Description"
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

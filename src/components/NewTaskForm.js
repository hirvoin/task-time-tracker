import React, { useState, useContext } from "react"
import uuid from "uuid"
import { TaskContext } from "../Store"
import { Fab, TextField, makeStyles, Divider } from "@material-ui/core"
import { Add } from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: theme.spacing(5),
    position: "relative"
  },
  form: {
    margin: "auto"
  },
  textField: {
    margin: theme.spacing(1),
    width: 200
  },
  button: {
    marginLeft: theme.spacing(1),
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)"
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}))

const initialState = ""

const NewTaskForm = () => {
  const [title, setTitle] = useState(initialState)
  const [description, setDescription] = useState(initialState)
  const [titleError, setTitleError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)

  const tasks = useContext(TaskContext)

  const isErrors = () => {
    if (title.length < 1 || description.length < 1) {
      title.length < 1 && setTitleError(true)
      description.length < 1 && setDescriptionError(true)
      return true
    }
    return false
  }

  const clearErrors = () => {
    setTitleError(false)
    setDescriptionError(false)
  }

  const handleSubmit = event => {
    event.preventDefault()
    clearErrors()
    if (isErrors()) {
      return
    }

    const newTask = {
      id: uuid(),
      title,
      description,
      dateAdded: new Date(),
      visible: true
    }
    tasks.dispatch({
      type: "ADD_TASK",
      data: newTask
    })
    setTitle(initialState)
    setDescription(initialState)
  }

  const classes = useStyles()

  return (
    <div>
      <div className={classes.root}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            error={titleError}
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
            error={descriptionError}
            value={description}
            className={classes.textField}
            variant="outlined"
            label="Description"
            name="taskDescription"
            type="text"
            placeholder="Description"
            onChange={event => setDescription(event.target.value)}
          />
          <Fab
            className={classes.button}
            variant="extended"
            color="secondary"
            type="submit"
          >
            <Add className={classes.icon} />
            Add task
          </Fab>
        </form>
      </div>
      <Divider />
    </div>
  )
}

export default NewTaskForm

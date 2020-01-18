import React, { useState, useContext } from "react"
import uuid from "uuid"
import { TaskContext } from "../Store"
import { Button } from "@material-ui/core"

const NewTaskForm = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const tasks = useContext(TaskContext)

  const handleSubmit = event => {
    event.preventDefault()
    tasks.dispatch({
      type: "ADD_TASK",
      data: { id: uuid(), title, description }
    })
  }

  return (
    <div>
      <h2>Add new task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Task Title
          <input
            name="taskTitle"
            type="text"
            placeholder="Title"
            onChange={event => setTitle(event.target.value)}
          />
        </label>
        <label>
          Task Description
          <input
            name="taskDescription"
            type="text"
            placeholder="Description"
            onChange={event => setDescription(event.target.value)}
          />
        </label>
        <Button variant="contained" color="primary" type="submit">
          Add new task
        </Button>
      </form>
    </div>
  )
}

export default NewTaskForm

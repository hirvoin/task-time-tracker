import React, { useContext } from "react"
import { TaskContext } from "../Store"
import Task from "./Task"

const TaskList = () => {
  const { tasks } = useContext(TaskContext)
  console.log("Task list:", tasks)

  if (!tasks) return null

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map(t => (
        <Task key={t.id} task={t} />
      ))}
    </div>
  )
}

export default TaskList

import React, { createContext, useReducer } from "react"
import uuid from "uuid"

const initialTasks = [
  {
    id: uuid(),
    title: "I'm a task!",
    description: "Try adding more from above",
    dateAdded: new Date(),
    visible: true
  }
]

export const TaskContext = createContext(initialTasks)

const Store = ({ children }) => {
  const [tasks, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_TASK": {
        const newState = [...state, action.data]
        return newState.sort(
          (a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()
        )
      }
      case "REMOVE_TASK": {
        return state.filter(t => t.id !== action.data)
      }
      case "START_TASK": {
        const stateWithoutTask = state.filter(t => t.id !== action.data.id)
        return [...stateWithoutTask, action.data].sort(
          (a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()
        )
      }
      case "STOP_TASK": {
        const stateWithoutTask = state.filter(t => t.id !== action.data.id)
        return [...stateWithoutTask, action.data].sort(
          (a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()
        )
      }
      case "SET_VISIBLE_TASKS": {
        return action.data
      }
      default:
        return state
    }
  }, initialTasks)

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}

export default Store

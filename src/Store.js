import React, { createContext, useReducer } from "react"
import uuid from "uuid"

const initialTasks = [
  {
    id: uuid(),
    title: "title1",
    description: "description1",
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
        throw new Error()
    }
  }, initialTasks)

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}

export default Store

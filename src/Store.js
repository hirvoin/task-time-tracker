import React, { createContext, useReducer } from "react"
import uuid from "uuid"

const initialTasks = [
  {
    id: uuid(),
    title: "title1",
    description: "description1"
  },
  {
    id: uuid(),
    title: "title2",
    description: "description2"
  },
  {
    id: uuid(),
    title: "title3",
    description: "description3"
  }
]

export const TaskContext = createContext(initialTasks)

const Store = ({ children }) => {
  const [tasks, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_TASK": {
        console.log("adding task")
        const newState = [...state, action.data]
        return newState
      }
      case "START_TASK": {
        console.log("starting task...")
        const updatedTask = {
          ...action.data,
          inProgress: true,
          startTime: Date()
        }
        const stateWithoutTask = state.filter(t => t.id !== action.data.id)
        return [...stateWithoutTask, updatedTask]
      }
      case "STOP_TASK": {
        console.log("STOP_TASK", action.data)
        const updatedTask = {
          ...action.data,
          inProgress: false,
          stopTime: Date()
        }
        const stateWithoutTask = state.filter(t => t.id !== action.data.id)
        return [...stateWithoutTask, updatedTask]
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

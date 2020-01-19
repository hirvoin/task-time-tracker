import React, { createContext, useReducer } from "react"
import uuid from "uuid"

const initialTasks = [
  {
    id: uuid(),
    title: "title1",
    description: "description1",
    dateAdded: new Date(),
    inProgress: false
  }
  // {
  //   id: uuid(),
  //   title: "title2",
  //   description: "description2",
  //   dateAdded: Date(),
  //   inProgress: false
  // },
  // {
  //   id: uuid(),
  //   title: "title3",
  //   description: "description3",
  //   dateAdded: Date(),
  //   inProgress: false
  // }
]

export const TaskContext = createContext(initialTasks)

const Store = ({ children }) => {
  const [tasks, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_TASK": {
        console.log("adding task")
        const newState = [...state, action.data]
        return newState.sort(
          (a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()
        )
      }
      case "START_TASK": {
        console.log("starting task...")
        const updatedTask = {
          ...action.data,
          inProgress: true,
          startTime: new Date()
        }
        const stateWithoutTask = state.filter(t => t.id !== action.data.id)
        return [...stateWithoutTask, updatedTask].sort(
          (a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()
        )
      }
      case "STOP_TASK": {
        console.log("STOP_TASK", action.data)
        const updatedTask = {
          ...action.data,
          inProgress: false,
          stopTime: new Date()
        }
        const stateWithoutTask = state.filter(t => t.id !== action.data.id)
        return [...stateWithoutTask, updatedTask].sort(
          (a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()
        )
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

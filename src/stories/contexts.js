import React, { createContext } from "react"
import uuid from "uuid"

const startTime = new Date("December 17, 1995 03:24:00")
const stopTime = new Date("December 20, 1995 17:11:34")

export const notStarted = {
  id: uuid(),
  title: "Not started",
  description: "This task has not been started yet",
  dateAdded: new Date(),
  visible: true
}

export const inProgress = {
  id: uuid(),
  title: "In Progress",
  description: "This task has been started, but hasn't been finished",
  dateAdded: new Date(),
  visible: true,
  startTime
}

export const finished = {
  id: uuid(),
  title: "Finished",
  description: "This task has been finished",
  dateAdded: new Date(),
  visible: true,
  startTime,
  stopTime,
  duration: stopTime.getTime() - startTime.getTime()
}

// could create "real" dummy context here
export const taskList = [notStarted, inProgress, finished]

const TaskContext = createContext(taskList)

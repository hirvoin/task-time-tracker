import React, { createContext } from "react"
import uuid from "uuid"

const startTime = new Date("December 17, 1995 03:24:00")
const stopTime = new Date("December 20, 1995 17:11:34")

export const notStarted = {
  id: uuid(),
  title: "Title",
  description: "Description",
  dateAdded: new Date(),
  visible: true
}

export const inProgress = {
  id: uuid(),
  title: "Title",
  description: "Description",
  dateAdded: new Date(),
  visible: true,
  startTime: new Date("December 17, 1995 03:24:00")
}

export const finished = {
  id: uuid(),
  title: "Title",
  description: "Description",
  dateAdded: new Date(),
  visible: true,
  startTime,
  stopTime,
  duration: stopTime.getTime() - startTime.getTime()
}

export const taskList = [notStarted, inProgress, finished]

const TaskContext = createContext(taskList)

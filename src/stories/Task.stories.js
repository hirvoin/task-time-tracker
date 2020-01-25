import React from "react"
import Task from "../components/Task"
import { notStarted, inProgress, finished } from "./contexts"

export default {
  title: "Task",
  component: Task
}

// task start- and end times are not displayed for some reason
export const NotStarted = () => <Task task={notStarted} />

export const InProgress = () => <Task task={inProgress} />

export const Finished = () => <Task task={finished} />

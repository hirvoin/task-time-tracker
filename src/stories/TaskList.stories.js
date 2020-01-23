import React from "react"
import { TaskContext } from "../Store"
import TaskList from "../components/TaskList"
import { taskList } from "./contexts"

const dummyDispatch = () => console.log("clicked")

export default {
  title: "TaskList",
  decorators: [
    StoryFn => {
      return (
        <TaskContext.Provider
          value={{ tasks: taskList, dispatch: dummyDispatch }}
        >
          <StoryFn />
        </TaskContext.Provider>
      )
    }
  ],
  component: TaskList
}

export const Default = () => {
  return <TaskList />
}

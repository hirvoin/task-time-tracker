import React from "react"
import { TaskContext } from "../Store"
import NavBar from "../components/NavBar"
import { taskList } from "./contexts"

const dummyDispatch = () => console.log("filtering")

export default {
  title: "NavBar",
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
  component: NavBar
}

export const Default = () => {
  return <NavBar />
}

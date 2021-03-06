import React from "react"
import { TaskContext } from "../Store"
import { HashRouter as Router } from "react-router-dom"
import NavBar from "../components/NavBar"
import { taskList } from "./contexts"

const dummyDispatch = () => console.log("filtering")

export default {
  title: "NavBar",
  decorators: [
    StoryFn => {
      return (
        <Router>
          <TaskContext.Provider
            value={{ tasks: taskList, dispatch: dummyDispatch }}
          >
            <StoryFn />
          </TaskContext.Provider>
        </Router>
      )
    }
  ],
  component: NavBar
}

export const Default = () => {
  return <NavBar />
}

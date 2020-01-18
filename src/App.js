import React from "react"
import { HashRouter as Router } from "react-router-dom"
import TaskList from "./components/TaskList"
import NewTaskForm from "./components/NewTaskForm"

const App = () => {
  return (
    <Router>
      <h1>Task time tracker application</h1>
      <NewTaskForm />
      <TaskList />
    </Router>
  )
}

export default App

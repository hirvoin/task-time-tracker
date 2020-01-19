import React from "react"
import { HashRouter as Router } from "react-router-dom"
import { Container, makeStyles } from "@material-ui/core"
import TaskList from "./components/TaskList"
import NewTaskForm from "./components/NewTaskForm"
import NavBar from "./components/NavBar"

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5)
  }
}))

const App = () => {
  const classes = useStyles()
  return (
    <Router>
      <NavBar />
      <Container className={classes.container}>
        <NewTaskForm />
        <TaskList />
      </Container>
    </Router>
  )
}

export default App

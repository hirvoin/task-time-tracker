import React from "react"
import { HashRouter as Router, Route, Redirect } from "react-router-dom"
import { Container, makeStyles } from "@material-ui/core"
import TaskList from "./components/TaskList"
import NewTaskForm from "./components/NewTaskForm"
import NavBar from "./components/NavBar"
import AboutPage from "./components/About"

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5)
  }
}))

const App = () => {
  const classes = useStyles()
  return (
    <Router>
      <Route exact path="/" render={() => <Redirect to="/tasks" />} />
      <NavBar />
      <Container className={classes.container}>
        <Route exact path="/tasks">
          <NewTaskForm />
          <TaskList />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
      </Container>
    </Router>
  )
}

export default App

import React from "react"
import { Container, Typography, Divider, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(5)
  },
  title: {
    flexGrow: 1
  },
  divider: {
    marginBottom: theme.spacing(3)
  }
}))

const About = () => {
  const classes = useStyles()
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        About
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant="body1" gutterBottom>
        Task management application where user can add tasks to list of tasks.
        Task can be started and finished. Every task shows its start- and finish
        time, and duration. Total duration is displayed on top of the page. Task
        list can be filtered from search bar.
      </Typography>
      <br />
      <Typography variant="body1" gutterBottom>
        Made with React and Material UI.
      </Typography>
      <br />
      <Typography variant="body1" gutterBottom>
        Github repository can be found{" "}
        <a href="https://github.com/hirvoin/task-time-tracker">here</a>.
      </Typography>
    </Container>
  )
}

export default About

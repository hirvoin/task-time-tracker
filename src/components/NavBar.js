import React, { useState, useEffect, useContext } from "react"
import { AppBar, Toolbar, Typography, InputBase } from "@material-ui/core/"
import { fade, makeStyles } from "@material-ui/core/styles"
import SearchIcon from "@material-ui/icons/Search"
import { TaskContext } from "../Store"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: theme.spacing(1),
    width: "auto"
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: 120,
    "&:focus": {
      width: 160
    }
  }
}))

const NavBar = () => {
  const { tasks, dispatch } = useContext(TaskContext)

  const [search, setSearch] = useState("")

  const classes = useStyles()

  const totalDuration = taskList => {
    const resultInSeconds =
      taskList.reduce((prev, curr) => {
        return !curr.duration ? prev : prev + curr.duration
      }, 0) / 1000

    if (!resultInSeconds) return null

    const hours = Math.floor(resultInSeconds / 3600)
    const minutes = Math.floor((resultInSeconds % 3600) / 60)
    const seconds = Math.floor((resultInSeconds % 3600) % 60)

    const hDisplay =
      hours > 0 ? hours + (hours === 1 ? " hour, " : " hours, ") : ""
    const mDisplay =
      minutes > 0 ? minutes + (minutes === 1 ? " minute, " : " minutes, ") : ""
    const sDisplay =
      seconds > 0 ? seconds + (seconds === 1 ? " second" : " seconds") : ""
    return "Total duration: " + hDisplay + mDisplay + sDisplay
  }

  // gives warnings so need to refactor later
  useEffect(() => {
    const toggledTasks = tasks.map(t => {
      console.log(t)
      return t.title.toLowerCase().includes(search)
        ? { ...t, visible: true }
        : { ...t, visible: false }
    })
    console.log("visible tasks", toggledTasks)
    dispatch({
      type: "SET_VISIBLE_TASKS",
      data: toggledTasks
    })
  }, [search])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            TaskApp
          </Typography>
          {tasks.length > 0 && (
            <Typography className={classes.title} noWrap>
              Total tasks: {tasks.length}{" "}
            </Typography>
          )}
          <Typography className={classes.title} noWrap>
            {totalDuration(tasks)}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={event => handleChange(event)}
              value={search}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar

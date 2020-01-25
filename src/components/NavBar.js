import React, { useState, useEffect, useContext } from "react"
import { AppBar, Toolbar, Typography, InputBase } from "@material-ui/core/"
import { fade, makeStyles } from "@material-ui/core/styles"
import { Search, Timer } from "@material-ui/icons/"
import { TaskContext } from "../Store"
import DropDownMenu from "./DropDownMenu"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0
  },
  title: {
    flexGrow: 1
  },
  details: {
    marginRight: theme.spacing(3)
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
  timeIcon: {
    marginRight: theme.spacing(1)
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: 140,
    "&:focus": {
      width: 200
    }
  }
}))

const NavBar = () => {
  const [search, setSearch] = useState("")

  const { tasks, dispatch } = useContext(TaskContext)
  const classes = useStyles()

  const totalDuration = taskList => {
    const result =
      taskList.reduce((prev, curr) => {
        return !curr.duration ? prev : prev + curr.duration
      }, 0) / 1000

    if (!result) return null

    const seconds = Math.floor((result % 3600) % 60)
    const minutes = Math.floor((result % 3600) / 60)
    const hours = Math.floor(result / 3600)

    const hDisplay =
      hours > 0 ? hours + (hours === 1 ? " hour, " : " hours, ") : ""
    const mDisplay =
      minutes > 0 ? minutes + (minutes === 1 ? " minute, " : " minutes, ") : ""
    const sDisplay =
      seconds > 0
        ? seconds + (seconds === 1 ? " second" : " seconds")
        : "1 second"
    return hDisplay + mDisplay + sDisplay
  }

  // needs refactoring?
  useEffect(() => {
    const toggledTasks = tasks.map(t => {
      return t.title.toLowerCase().includes(search.toLowerCase())
        ? { ...t, visible: true }
        : { ...t, visible: false }
    })

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
          <DropDownMenu />
          <Typography className={classes.title} variant="h6" noWrap>
            TaskApp
          </Typography>{" "}
          <div
            className={classes.details}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Timer className={classes.timeIcon} />
            <p>
              {totalDuration(tasks) ? (
                totalDuration(tasks)
              ) : (
                <i> total duration</i>
              )}
            </p>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              onChange={event => handleChange(event)}
              value={search}
              placeholder="Filter by title…"
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

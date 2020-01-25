import React from "react"
import { Link } from "react-router-dom"
import { Menu, IconButton, MenuItem } from "@material-ui/core/"
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.dark
  }
}))

const DropDownMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="simple-menu"
        onClick={handleClick}
        aria-haspopup="true"
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/tasks" className={classes.link}>
          <MenuItem onClick={handleClose}>Tasks</MenuItem>
        </Link>
        <Link to="/about" className={classes.link}>
          <MenuItem onClick={handleClose}>About</MenuItem>
        </Link>
      </Menu>
    </div>
  )
}

export default DropDownMenu

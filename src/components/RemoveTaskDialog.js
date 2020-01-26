import React, { useContext } from "react"
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core/"
import { Delete } from "@material-ui/icons"
import { TaskContext } from "../Store"

const RemoveTaskDialog = props => {
  const [open, setOpen] = React.useState(false)
  const { dispatch } = useContext(TaskContext)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    setOpen(false)
    dispatch({
      type: "REMOVE_TASK",
      data: props.taskId
    })
  }

  return (
    <div
      style={{
        marginLeft: "auto"
      }}
    >
      <IconButton aria-label="delete" onClick={handleClickOpen} size="small">
        <Delete />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete task from task list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default RemoveTaskDialog

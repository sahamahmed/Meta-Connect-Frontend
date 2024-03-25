import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({func}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ backgroundColor: "gray", color: "white" }}>
          {"Confirm Deletion"}
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "gray", color: "white" }}>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete, this action is irreversable
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "gray", color: "white" }}>
          <Button
            onClick={handleClose}
            style={{ fontWeight: "bold", color: "white" }}
          >
            Go back
          </Button>
          <Button onClick={func} style={{ fontWeight: "bold", color: "white" }}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

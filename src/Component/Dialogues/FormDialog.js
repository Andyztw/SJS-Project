import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LoginForm from "./LoginForm";

export default class FormDialog extends React.Component {
  state = {
    open: false,
    logged: false,
    userName: "",
    passWord: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleLogin = () => {
    this.setState({ open: false });
    this.setState({ logged: true });
  };

  handleClickLogout = () => {
    this.setState({ open: false });
    this.setState({ userName: "" });
    this.setState({ logged: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleFormChange(user, pass) {
    this.setState({
      userName: user,
      passWord: pass
    });
    console.log(user);
  }

  render() {
    return (
      <div>
        {this.state.logged ? (
          <Button onClick={this.handleClickLogout}>
            Log out: {this.state.userName}
          </Button>
        ) : (
          <Button onClick={this.handleClickOpen}>Login </Button>
        )}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your user name to login to your personal test
              database.
            </DialogContentText>
            <LoginForm onSubmit={this.handleFormChange.bind(this)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogin} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

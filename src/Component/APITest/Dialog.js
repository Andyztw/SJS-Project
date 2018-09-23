import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ResponseDialog extends React.Component {
  state = {
    open: false,
  };

  constructor(props){
      super(props)
      this.state = {
          open: props.open,
          title : props.title,
          message : props.message
      }
      console.log("inside the dialog construtor")
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    const {title, message, open} = this.state;

    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Keep going
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Finished
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ResponseDialog;
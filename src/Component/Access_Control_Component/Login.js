import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField"
import axios from 'axios'

import {url, signIn, saveAccessToken, getAccessToken,} from '../BackEnd/BackEndDataServices'

// This component handles the sign in of the user into the application.

//setting styles of the form elements in here
const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", 
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },

  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },

  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },

  form: {
    width: "100%", 
    marginTop: theme.spacing.unit
  },

  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class LogIn extends Component {
  state = {
    userName: "", //to hold the value in the username input
    Pword: "",   // to hold the value in the password input
    valid: false, //hold the state of whether username and password pass validation 
    errorMsg: "", //hold the error message when sign in fails
    showErr: false //set the state of whether to show the error textfield component
  };

  constructor(props) {
    super(props);
    this.FetchToken = this.FetchToken.bind(this); //binding this function to this component
  }

  /*This function will use axio to post the username and password store in the state 
    of userName and Pword, an if condition checks the response message from the server 
    is OK, if true, will copy and store the token data into local storage under the name
    jwtToken, and call the onSubmit function passed down from parent to go into the app,
    finally the catch at the end will handle and notify use of errors.
    */
  FetchToken() {
    
    let path = signIn; //path of the api call
    let currentComponent = this; //keep track of the current componet
    let bod = {"username" : this.state.userName, "password" : this.state.Pword} //crate the body of the post action
    
    //axios will post the bod Json object to the combined url and path.  
    axios.post(url + path, bod)
      .then(function (response) {
        if(response.data.message === 'OK'){
          saveAccessToken(response.data.token); //save the token according to designated method.
          currentComponent.props.onSubmit();
        }
      })
      .catch(function (error) {
        currentComponent.setState({ errorMsg: "Cannot authenticated user, please check your user name or password", showErr: true })
        console.log(error);
        
      });
  }

  //checks that the user have atleast one letter in both username and password field.
  checkInputNotEmpty() {
    if (!this.state.userName || !this.state.Pword) { return false; }
    else {
      return true;
    }
  }

  //keep track of the change in the textfield box and update those changes 
  handleChange = name => ({ target: { value } }) => {
    this.setState({
      [name]: value
    });
  };

  /*handles the actions when user click on login button, first call checkInputNotEmpty 
    to make sure user entered something, then checks that we don't already have a token, 
    if not we call the FetchToken to get one and validate user.
    */
  handleSubmit = () => {
    if (this.checkInputNotEmpty()) {
      if (getAccessToken() === null) {
        this.FetchToken();
      }
    }
    else {
      this.setState({ errorMsg: "Make sure user name or password are not empty", showErr: true })
    }

  };

  render() {
    const { classes } = this.props;
    const { userName, Pword } = this.state;

    return (
      <Fragment>
        <CssBaseline />

        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>

            <Typography variant="headline">Login</Typography>
            {this.state.showErr ? <TextField
              id="ErrorLog"
              multiline
              fullWidth
              rowsMax="4"
              style={{ "background": "#FF8A80" }}
              value={this.state.errorMsg}
              InputProps={{
                readOnly: true,
              }}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            /> : null}
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel>User name</InputLabel>

                <Input
                  id="User"
                  name="User"
                  autoComplete="current-User"
                  autoFocus
                  value={userName}
                  onChange={this.handleChange("userName").bind(this)}
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>

                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={Pword}
                  onChange={this.handleChange("Pword").bind(this)}
                />
              </FormControl>

              <Button
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmit}
              >
                Login now
              </Button>
            </form>
          </Paper>
        </main>
      </Fragment>
    );
  }
}

LogIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogIn);

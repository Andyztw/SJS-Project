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

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
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
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },

  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class LogIn extends Component {
  state = {
    userName: "",
    Pword: "",
    privi: "Admin",
    valid: false,
    errorMsg: "",
    showErr: false
  };

  constructor(props) {
    super(props);
    this.FetchUserData = this.FetchUserData.bind(this);
  }

  
  FetchUserData(){
    let url = "https://www.nzbeta.com/";
    let currentComponent = this;
   //  console.log("in fetch ops")
   //  fetch('https://www.nzbeta.com/api/v1/users/signin')
   // .then((response) => response.json())
   // .then((res)=>{
   //   console.log(res)
   //   this.setState({
   //     data: res
   //   })
   // })

   fetch(url+'api/v1/users/signin', {
     method: 'POST',
     headers: {
             //"Content-Type": "application/json; charset=utf-8",
              //"Content-Type": "application/x-www-form-urlencoded",
              //Accept : 'application/json',
              'Content-Type': 'application/json'
         },
    body: JSON.stringify({"username": "test", "password": "test"}),
    //body: "username="+this.state.userName+"&password="+this.state.Pword,
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
      console.log("fetching token after response")

      if(data.message === "OK"){
        localStorage.setItem('jwtToken', data.token);
        currentComponent.setState({valid : true});
      }
  });
 }
  //valiadate the user input and checks if user exist and password checks out
  checkInputNotEmpty(){
    if(!this.state.userName || !this.state.Pword)
    {return false;}
    else{
        return true;
    }
  }

  //keep track of the change in the text box
  handleChange = name => ({ target: { value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    if(this.checkInputNotEmpty()){
        if(localStorage.getItem('jwtToken') === null){
        this.FetchUserData();
        this.props.onSubmit({ name: this.state.userName, pri: this.state.privi, status : this.state.valid });
      }
    }

    else{
      this.setState({errorMsg: "Make sure user name or password are not empty", showErr: true})
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
            {this.state.showErr? <TextField
          id="ErrorLog"
          multiline
          fullWidth
          rowsMax="4"
          style={{"background" : "red"}}
          value={this.state.errorMsg}
          InputProps={{
            readOnly: true,
          }}
          className={classes.textField}
          margin="normal"
          variant="filled"
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

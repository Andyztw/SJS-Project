import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TestTable from "./API_Monitor_Component/TestTable";
import LogIn from "./Access_Control_Component/Login";
import Footer from "./Layout/Footer";
import AddAPI from "./AddAPI_Component/AddAPI";
import EditAPI from './EditAPI_Component/EditAPI';
import {getAccessToken, clearToken } from './BackEnd/BackEndDataServices'

//the top level component for th application.

const styles = theme => ({
  root: {
    display: "flex"
  },
  title: {
    flexGrow: 1
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 0.5,
    height: "95vh",
    overflow: "auto"
  },
  button: {
    margin: theme.spacing.unit,
    width: 150
  }
});

class Dashboard extends Component {
  state = {
    login: false, //flag the app if user is logged in
    view: "LOGIN", //default to the API management view, use to change to other views
    AppView: "Login Please", //the title for app bar to display which screen we are in
    currentAPI: {
      method: "POST",
      protocol: "https://",
      host: "www.nzbata.com/",
      path: "api/users/login",
      paraList: [{ key: "username", value: "test" }, { key: "password", value: "test" }],
      headerList: [{ key: "Accept", value: "application/Json" }, { key: "agent", value: "Mozilla" }, { key: "Content-Type", value: "application/Json" }],
    }, //default api for the tables
  };

  constructor(props) {
    super(props);
    if (getAccessToken()) {
      this.state.login = true;
      this.state.view = "API";
      this.state.AppView = "API Status Monitor"
    }
  }

  //handle the login action
  handleLogIn = () => {
  
    this.setState({
      login: true,
      view: "API",
      AppView: "API Status Monitor"
    })
  }

  //handle when user clicks logout button.
  handleLogout = () => {
    clearToken(); //call the designated function to clear the stored token.
    this.setState({ login: false, view: "LOGIN", AppView: "Login Please" });
  };

  //change the view to API Monitor screen
  handleChangeAPI = () => {
    if (this.state.login) {
      this.setState({ view: "API", AppView: "API Status Monitor" });
    }
  };

  //change the view to Editing API screen, using the argument API as the target.
  handleChangeEditAPI = (API) => {
    if (this.state.login) {
      this.setState({ view: "EDIT", AppView: "API Editing", currentAPI: API });
    }
  };

  //change the view to Add API screen
  handleChangeAddAPI = () => {
    if (this.state.login) {
      this.setState({ view: "ADD", AppView: "Add New API" });
    }
  };

  //perform the actions when add api screen finish and revert back to monitor screen
  handleAddAPIRequest = () => {
    this.handleCancel()
  };

  //called when edit or add api screen calls the cancel button click action listener
  handleCancel = () => {
    this.handleChangeAPI();
  }

  //performed the actions when the Edit api screen finish and wants to revert to monitor screen
  handleEditAPIRequest = ()=> {
    this.handleCancel()
  };

  //change the screen depending on the logic - argument viewOption is the choice of view, classes are passing props down
  createView(viewOption, classes) {
    //check if the user have login yet, if not only display the login screen
    if (!this.state.login) {
      return (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
            <LogIn onSubmit={this.handleLogIn.bind(this)} />
        </main>
      );
    }
    //If we did have login, let user select their needed views
    switch (viewOption) {
      case "API": 
        return (
          <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <TestTable handleAddAPI={this.handleChangeAddAPI}
                handleEdit={(API) => this.handleChangeEditAPI(API)}
              />
          </main>
        );
        
      case "EDIT":
        return (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
              <EditAPI
                Editing={this.state.currentAPI}
                handleEditAPI={this.handleEditAPIRequest}
                handleCancel={() => this.handleCancel()}
              />
          </main>
        );
        
      case "ADD":
        return (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
              <AddAPI handleAdd={this.handleAddAPIRequest}
                handleCancel={() => this.handleCancel()}
              />
          </main>
        );
      default: return(
          <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <TestTable handleAddAPI={this.handleChangeAddAPI}
                handleEdit={(API) => this.handleChangeEditAPI(API)}
              />
          </main>
        ); 
    }
  }

  render() {
    const { classes } = this.props;
    const { view } = this.state;

    return (
      <Fragment>
        <CssBaseline />

        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classes.appBar}
          >
            <Toolbar
              className={classes.toolbar}
            >
              <Typography
                variant="title"
                color="inherit"
                noWrap
                className={classes.title}
              >
                SJS Testing Console V1.0 --- {this.state.AppView}
              </Typography>
              {this.state.login ?
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={this.handleLogout.bind(this)}>
                  Log Out
            </Button> : null}
            </Toolbar>
          </AppBar>
          {this.createView(view, classes)}
        </div>

        <Footer />
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);

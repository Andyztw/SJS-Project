import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TestTable from "./APITest/TestTable";
import LogIn from "./Dialogues/Login";
import Footer from "./Layout/Footer";
import AddAPI from "./APITest/AddAPI";
import EditAPI from './APITest/EditAPI';


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
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  tableContainer: {
    height: 320
  },
  button: {
    margin: theme.spacing.unit,
    width: 150
  }
});

class Dashboard extends Component {
  state = {
    login: false, //flag the app if user is logged in
    open: false, //whether to show the logout button
    view: "LOGIN", //default to the API management view, use to change to other views
    AppView: "Login Please", //the title for app bar to display which screen we are in
    user: { id: 0, name: "None", privilge: "NONE" }, //default user profile.
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
    if (localStorage.getItem('jwtToken')) {
      this.state.login = true;
      this.state.view = "API";
      this.state.AppView = "API Status Monitor"
    }
  }

  //handle the login action
  handleLogIn = () => {
    console.log('inside handle login')
    this.setState({
      login: true,
      view: "API",
      AppView: "API Status Monitor"
    })
  }

  //handle when user clicks logout button.
  handleLogout = () => {
    localStorage.removeItem('jwtToken');
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
    console.log("finished with add api, back to monitor")
    this.handleCancel()
  };

  //called when edit or add api screen calls the cancel button click action listener
  handleCancel = () => {
    this.handleChangeAPI();
  }

  //performed the actions when the Edit api screen finish and wants to revert to monitor screen
  handleEditAPIRequest = ()=> {
    console.log("Finish editing, back to monitor ")
    this.handleCancel()
  };

  //change the screen depending on the logic
  createView(v, classes) {
    //check if the user have login yet, if not only display the login screen
    if (!this.state.login) {
      return (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div className={classes.tableContainer}>
            <LogIn onSubmit={this.handleLogIn.bind(this)} />
          </div>
        </main>
      );
    }
    //If we did have login, let user select their needed views
    switch (v) {
      case "API":
        return (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div className={classes.tableContainer}>
              <TestTable handleAddAPI={this.handleChangeAddAPI}
                handleEdit={(API) => this.handleChangeEditAPI(API)}
              />
            </div>
          </main>
        );
        break;
      case "EDIT":
        return (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div className={classes.tableContainer}>
              <EditAPI
                Editing={this.state.currentAPI}
                handleEditAPI={this.handleEditAPIRequest}
                handleCancel={() => this.handleCancel()}
              />

            </div>
          </main>
        );
        break;
      case "ADD":
        return (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div className={classes.tableContainer}>
              <AddAPI handleAdd={this.handleAddAPIRequest}
                handleCancel={() => this.handleCancel()}
              />
            </div>
          </main>
        );
        break;
    }
  }
  button

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
                SJS Testing Console v0.5 --- {this.state.AppView}
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

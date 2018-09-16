import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import TestTable from "./APITest/TestTable";
import Conf from "./APITest/Conf";
import UserCon from "./UserMan/UserCon";
import Report from "./APITest/report";
import LogIn from "./Dialogues/Login";
import Footer from "./Layout/Footer";
import AddAPI from "./APITest/AddAPI";
import User from './APITest/User';
import EditAPI from './APITest/EditAPI';

const drawerWidth = 240;


const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },

  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },

  menuButtonHidden: {
    display: "none"
  },

  title: {
    flexGrow: 1
  },

  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },

  appBarSpacer: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },

  chartContainer: {
    marginLeft: -22
  },

  tableContainer: {
    height: 320
  }
});

class Dashboard extends Component {
  state = {
    login: false, //flag the app if user is logged in
    open: false, //whether to expand the sidebar.
    view: "LOGIN", //default to the API management view, use to change to other views
    AppView: "Login Please",
    user: { id: 0, name: "None", privilge: "NONE" }, //default user profile.
    currentAPI: {
      method: "POST",
      protocol: "https://",
      host: "www.nzbata.com/",
      path: "api/users/login",
      paraList: [{key: "username", value: "test" },{key: "password", value: "test" }],
      headerList: [{key: "Accept", value:"application/Json"},{key: "agent",value:"Mozilla"}, {key: "Content-Type", value:"application/Json"}],
    }
  };

  constructor(props){
    super(props);
    if(localStorage.getItem('jwtToken')){
      this.state.login = true;
      this.state.view = "API";
      this.state.AppView = "API Status Monitor"
    }
  }

  //handle the login infor
  handleLogIn = obj => {
    console.log('inside handle login')
    if(obj.status){

    this.setState({
      login: true,
      view: "API",
      AppView: "API Status Monitor"
    });
    this.setState({ user: { id: 1, name: obj.name, privilge: obj.pri } });
  }
  else {
    this.setState({appView: "Login failed, please check entry"});
  }
  };

  //handle when user clicks logout.
  handleLogout = () => {
    localStorage.removeItem('jwtToken');
    this.setState({ login: false, view: "LOGIN", AppView: "Login Please" });
  };
  //change the view to API management when user click on the panel item
  handleChangeAPI = () => {
    if (this.state.login) {
      this.setState({ view: "API", AppView: "API Status Monitor" });
    }
  };

  //change the view to User management when user click on the panel item
  handleChangeUser = () => {
    if (this.state.login) {
      this.setState({ view: "USER", AppView: "User Management Console" });
    }
  };

  //change the view to Report management when user click on the panel item
  handleChangeReport = () => {
    if (this.state.login) {
      this.setState({ view: "REPORT", AppView: "Reports Management Console" });
    }
  };

  //change the view to API management when user click on the panel item
  handleChangeConf = () => {
    if (this.state.login) {
      this.setState({ view: "CONF", AppView: "Configuration Console" });
    }
  };

  //open the drawer panel
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  //close the panel
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

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
              <TestTable />
            </div>
          </main>
        );
        break;
      case "USER":
        return (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div className={classes.tableContainer}>
              <User />
            </div>
          </main>
        );
        break;
      case "REPORT":
        return (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div className={classes.tableContainer}>
            <EditAPI
              Editing={this.state.currentAPI}
              />

            </div>
          </main>
        );
        break;
      case "CONF":
        return (
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div className={classes.tableContainer}>
              <AddAPI />
            </div>
          </main>
        );
        break;
    }
  }

  //creates the sidebar of view
  createSideBar = () => {
    return (
      <List>
        <div>
          <ListItem button onClick={this.handleChangeAPI}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="API Management" />
          </ListItem>

          <ListItem button onClick={this.handleChangeUser}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Access Control" />
          </ListItem>

          <ListItem button onClick={this.handleChangeReport}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Api testing" />
          </ListItem>

          <ListItem button onClick={this.handleChangeConf}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Add API testing" />
          </ListItem>
        </div>
      </List>
    );
  };

  //add to the user profile section
  createUserProfile = () => {
    return (
      <List>
        <div>
          <ListSubheader inset>User Profile</ListSubheader>
          <ListItem button onClick={this.handleLogout.bind(this)}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>

            <ListItemText primary={this.state.user.name} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>

            <ListItemText primary={this.state.user.privilge} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>

            <ListItemText primary="Some info about user?" />
          </ListItem>
        </div>
      </List>
    );
  };

  render() {
    const { classes } = this.props;
    const { view } = this.state;

    return (
      <Fragment>
        <CssBaseline />

        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(
              classes.appBar,
              this.state.open && classes.appBarShift
            )}
          >
            <Toolbar
              disableGutters={!this.state.open}
              className={classes.toolbar}
            >
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,

                  this.state.open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="title"
                color="inherit"
                noWrap
                className={classes.title}
              >
                SJS Testing Console v0.2 --- {this.state.AppView}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              )
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>

            <Divider />
            {this.createSideBar()}
            <Divider />
            {this.state.login ? this.createUserProfile() : null}
          </Drawer>
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

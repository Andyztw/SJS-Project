import React, { Component } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Toolbar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = {
  root: {
    flexGrow: 1
  }
};

class UserCon extends Component {
  state = {
    view: "Con",
    value: 0
  };

  createView = () => {
    return (
      <h1>
        Welcome to User Management Console, you can click on any of the above
        buttons for your needs
      </h1>
    );
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper>
        <div>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            fullWidth
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </div>
        <div>{this.createView()}</div>
      </Paper>
    );
  }
}
UserCon.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserCon);

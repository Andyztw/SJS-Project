import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class DisabledTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Paper>
        <Tabs
          value={this.state.value}
          indicatorColor="primary"
          textColor="primary"
          centered
          onChange={this.handleChange}
        >
          <Tab label="Report Console" />
          <Tab label="Edit Test" disabled />
          <Tab label="Edit User" />
          <Tab label="Email Me" />
        </Tabs>
      </Paper>
    );
  }
}

export default DisabledTabs;

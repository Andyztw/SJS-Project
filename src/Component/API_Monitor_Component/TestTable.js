import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TestTableHead from './TestTableHead'
import TestTableToolbar from './TestTableToolbar'
import {url, runSelect, lockInvert, dashBoard, getAccessToken} from '../BackEnd/BackEndDataServices'

//styles for the table body
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 0.1,
    overflowX: "auto"
  },
  table: {
    minWidth: 1000
  },
  tableWrapper: {
    overflowX: "auto",
    height: '580px'
  },
});

const style = {
  failTest: {
    background : "#FF8A80",
  },
  passTest: {
    background : "white",
  }
};

//the main class
class TestTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: false, 
      selected: [], //the array holding the id of api currently selected
      data: [],     //the array holding api objects return from database.
      response: {}, //the response from posting to database
      isLoading: true, //set the state to either loading the data or not, to prevent concurrency problems
      error: null,   //hold the error object 
      errMsg: "Loading data, please wait..." //the default message for user when loading data, change to reflect errors
    };

    //binding the following functions to this class
    this.fetchDashData = this.fetchDashData.bind(this);
    this.postDeleteAPI = this.postDeleteAPI.bind(this);
    this.postRunAPI = this.postRunAPI.bind(this);
  }

  //the codes for loading data form back end as follows 
  componentDidMount() {
    //check if token already there, fetch it if not
    if (getAccessToken()) {
      this.fetchDashData()
    }
    //if error occurs, record it.
    else this.setState({ errMsg: "Missing Token", error: "missing token" });
  }

  //for getting api dash board data
  fetchDashData() {

    let self = this; //keep track of the table component
    //set the state to loading true and clear all selected ids.
    this.setState({ isLoading: true, errMsg: "Loading data, please wait...", error: null, selected: [] });
    let path = dashBoard //the path name to the required api call

    let bod = { "token": getAccessToken() }; //set the body part of the post

    //post to server using axios 
    axios.post(url + path, bod)
      .then(function (response) {
        //after the promise is resolved, 
        console.log(response.data.data)
        self.setState({
          data: response.data.data //set the data array to this state's data array.
          , isLoading: false //change the loading state to false, telling the render to paint the table
        })
      })
      .catch(function (error) {
        self.setState({ error, isLoading: false, errMsg: "Failed to load data" })
      });
  }

  //for sending the deleted ids to backend
  postDeleteAPI() {
    let self = this
    let path = lockInvert
    let bod = { "token": getAccessToken(), "selected_ids": self.state.selected };
    console.log(bod)
    axios.post(url + path, bod)
      .then(function (response) {
        console.log("in axios postDelete")
        console.log(response)
        console.log(response.data.message)
        console.log(response.data.error)
        if (response.data.message === "OK") {
          console.log("in if loop")
          self.doRemoveDelete(self , response);
        }
      })
      .catch(function (error) {
        console.log(error)
        self.setState({ error, isLoading: false, errMsg: "Failed to Post delete data" })
      });

  }

  //remove the deleted api from the table view
  doRemoveDelete(self, response) {
    console.log("in removedelete")
    let newTable = self.state.data;
    console.log(newTable)

    newTable = newTable.filter((fItem) => {
      return !self.state.selected.includes(fItem.id)
    });
    console.log(newTable)
    self.setState({ data: newTable, selected: [], dialogOpen: true, response: response });

  }

  //sending the run now api ids to backend
  postRunAPI() {
    let self  = this
    let path = runSelect
    let bod = { "token": getAccessToken(), "selected_ids": self.state.selected };
    console.log(bod)
    axios.post(url + path, bod)
      .then(function (response) {
        console.log("in axios postRun")
        self.doUpdateRun(self, response)
      })
      .catch(function (error) {
        self.setState({ error, isLoading: false, errMsg: "Failed to Post run data" })
      });
  }

  //updates the status of test runs after finish running api 
  doUpdateRun(self, response) {
    console.log(response)
    let arrOriginal = self.state.data;
    let arrChanged = response.data.data;
  
    let  arrLastest = arrOriginal.map(obj => arrChanged.find(obj2 => obj2.id === obj.id) || obj);
    console.log(arrLastest)
    self.setState({ response: response, selected: [], data : arrLastest, dialogOpen: true })
  }

  //when user click on the header check box, decide whether to add all ids or remove all from selected array
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  //when user click on a row, switch the state of the check box on that row, update the selected array to remove or add it
  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    
    this.setState({ selected: newSelected });
  };

  //grabbing the selected api object to pass to edit  
  getSelectedAPIObj() {
    //use the id stored in the selected array and search the data array for its object
    let myAPI = {};
    let id = this.state.selected[0];
    if (this.state.selected.length > 0) {
      myAPI = this.state.data.find((item) => {
        if (item.id === id) {
          return item;
        }
      });
    }
    return myAPI;
  }

  //when the alert dialog is close by user
  handleDialogClose = () =>{
    this.setState({dialogOpen: false})
  }

  //do a check of an id to see if its in the selected array, return true when the index is not -1
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, handleAddAPI, handleEdit,
    } = this.props;

    const { data, selected, isLoading, errMsg, dialogOpen, response } = this.state;

    return (
      <Paper className={classes.root}>
        {isLoading ? <h1> {errMsg} </h1>
          : <Fragment> <TestTableToolbar numSelected={selected.length}
            AddAPI={handleAddAPI}
            Edit={() => handleEdit(this.getSelectedAPIObj())}
            Refresh={this.fetchDashData}
            Delete={this.postDeleteAPI}
            Run={this.postRunAPI}
          />

            <div className={classes.tableWrapper} >
              <Table className={classes.table} aria-labelledby="tableTitle">
                <TestTableHead
                  numSelected={selected.length}
                  onSelectAllClick={this.handleSelectAllClick}
                  rowCount={data.length}
                />
                <TableBody>
                  {data.map(dataItem => {
                    const isSelected = this.isSelected(dataItem.id);
                    var lastRun = new Date(parseInt(dataItem.timestamp))
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, dataItem.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={dataItem.id}
                        style = { dataItem.passed > 0 ? style.passTest: style.failTest}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell numeric component="th" scope="row" padding="none">
                          {+dataItem.id}
                        </TableCell>
                        <TableCell >{dataItem.protocol + "://" + dataItem.domain + "/" + dataItem.path}</TableCell>
                        <TableCell >{dataItem.method}</TableCell>
                        <TableCell >{lastRun.toLocaleString()}</TableCell>
                        <TableCell>{dataItem.passed > 0 ? "Pass" : "Fail"}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Fragment>
        }
        <div>
        <Dialog
          open={dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Operations completed</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
                Continue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      </Paper>
    );
  }
}

TestTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TestTable);

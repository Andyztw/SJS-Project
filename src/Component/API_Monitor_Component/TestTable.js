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

//we set name and other settings of the column header for the table here
/*
const rows = [
  { id: "id", numeric: true, disablePadding: true, label: "ID"},
  { id: "testRes ", numeric: false, disablePadding: false, label: " Test Result" },
  { id: "time", numeric: false, disablePadding: false, label: "Last Run on " },
  { id: "method", numeric: false, disablePadding: false, label: "Method" },
  { id: "url", numeric: false, disablePadding: false, label: "Full URL of API" },
];

//a custmized header row for the table
class TestTableHead extends Component {

  render() {
    const {
      onSelectAllClick,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"
            style={{ 'background': 'black', 'color': 'white' }}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              style={{ 'background': 'black', 'color': 'white' }}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? "none" : "default"}
                style={{ 'background': 'black', 'color': 'white' }}
              >
                {row.label}

              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

TestTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired
};

//create the main button tool bar's styles 
const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.5)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  },
  button: {
    margin: theme.spacing.unit,
    width: 180
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 30,
  },
});

//create the toolbar to hold the main function buttons
let TestTableToolbar = props => {
  const { numSelected, classes, AddAPI, Edit,
    Refresh, Delete, Run } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.actions}>

        {numSelected > 0 ? (
          <div className="AppBarButtons">
            <Tooltip title="Refresh display">
              <Button variant="contained" aria-label="Refresh"
                className={classes.button}
                onClick={Refresh}>
                Refresh Now
                <CachedIcon className={classes.rightIcon} />
              </Button>
            </Tooltip>
            <Tooltip title="Add new API">
              <Button variant="contained" aria-label="AddAPI"
                className={classes.button}
                color="primary"
                onClick={AddAPI}>
                Add New API
                <AddIcon className={classes.rightIcon} />
              </Button>
            </Tooltip>
            <Tooltip title="Run Selected Test">
              <Button
                variant="contained"
                color="primary"
                aria-label="Selected Run"
                className={classes.button}
                onClick={Run}
              >
                Run {" " + numSelected + " API"}
                <PlayArrowIcon className={classes.rightIcon} />
              </Button>
            </Tooltip>
            {numSelected === 1 ? (
              <Tooltip title="Edit selected API">
                <Button
                  variant="contained"
                  color="primary"
                  aria-label="Edit"
                  onClick={Edit}
                  className={classes.button}
                >
                  Edit API
                <EditIcon className={classes.rightIcon} />
                </Button>
              </Tooltip>) : null}
            <Tooltip title="Delete selected test">
              <Button variant="contained" color="secondary" aria-label="Delete"
                className={classes.button}
                onClick={Delete}>
                Delete {" " + numSelected + " API"}
                <DeleteIcon className={classes.rightIcon} />
              </Button>
            </Tooltip>

          </div>
        ) : (
            <div className="AppBarButtons">

              <Tooltip title="Refresh display">
                <Button variant="contained" aria-label="Refresh"
                  className={classes.button}
                  onClick={Refresh}>
                  Refresh Now
                <CachedIcon className={classes.rightIcon}
                  />
                </Button>
              </Tooltip>
              <Tooltip title="Add new API">
                <Button variant="contained" aria-label="AddAPI"
                  className={classes.button}
                  color="primary"
                  onClick={AddAPI}>
                  Add New API
                <AddIcon className={classes.rightIcon} />
                </Button>
              </Tooltip>
            </div>
          )}
      </div>
    </Toolbar>
  );
};

TestTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

//give it a name so we can use it in the component
TestTableToolbar = withStyles(toolbarStyles)(TestTableToolbar);*/

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
    background : "#FF8A80"
  },
  passTest: {
    background : "#B9F6CA"
  }
};

const url = "https://www.nzbeta.com/" //name of our server 

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
    if (localStorage.getItem('jwtToken')) {
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
    let path = 'api/v1/dashboard' //the path name to the required api call

    let bod = { "token": localStorage.getItem('jwtToken') }; //set the body part of the post

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

  //for sending the deleted to backend
  postDeleteAPI() {
    let self = this
    let path = "api/v1/apis/invert_lock"
    let bod = { "token": localStorage.getItem('jwtToken'), "selected_ids": self.state.selected };
    console.log(bod)
    axios.post(url + path, bod)
      .then(function (response) {
        console.log("in axios postDelete")
        console.log(response)
        console.log(response.data.message)
        console.log(response.data.error)
        if (response.data.message === "OK") {
          console.log("in if loop")
          self.doRemoveDelete(self);
        }
      })
      .catch(function (error) {
        console.log(error)
        self.setState({ error, isLoading: false, errMsg: "Failed to Post delete data" })
      });

  }

  //remove the deleted api from the 
  doRemoveDelete(self) {
    console.log("in removedelete")
    let newTable = self.state.data;
    console.log(newTable)

    newTable = newTable.filter((fItem) => {
      return !self.state.selected.includes(fItem.id)
    });
    console.log(newTable)
    self.setState({ data: newTable, selected: [], dialogOpen: true });

  }

  //sending the run now api to backend
  postRunAPI() {
    let self  = this
    let path = "api/v1/apis/run_selected"
    let bod = { "token": localStorage.getItem('jwtToken'), "selected_ids": self.state.selected };
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

  doUpdateRun(self, response) {
    console.log(response)
    let arrOriginal = self.state.data;
    let arrChanged = response.data.data;
  
    let  arrLastest = arrOriginal.map(obj => arrChanged.find(obj2 => obj2.id === obj.id) || obj);
    console.log(arrLastest)
    self.setState({ response: response, selected: [], data : arrLastest, dialogOpen: true })
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

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

  handleDialogClose = () =>{
    this.setState({dialogOpen: false})
  }

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
                        key={+dataItem.id}
                        style = { dataItem.passed > 0 ? style.passTest: style.failTest}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell numeric component="th" scope="row" padding="none">
                          {+dataItem.id}
                        </TableCell>
                        <TableCell>{dataItem.passed > 0 ? "Pass" : "Fail"}</TableCell>
                        <TableCell >{lastRun.toLocaleString()}</TableCell>
                        <TableCell >{dataItem.method}</TableCell>
                        <TableCell >{dataItem.protocol + "//" + dataItem.domain + "/" + dataItem.path}</TableCell>
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

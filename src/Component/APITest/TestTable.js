import React, {Component, Fragment} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import CachedIcon from '@material-ui/icons/Cached';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import ListDisplay from './ListDisplay'
import axios from 'axios'

//we set the column header and other settings here
const rows = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID"
  },
  { id: "testRes ", numeric: false,  disablePadding: false, label: " Test Result" },
  { id: "time", numeric: false,  disablePadding: false, label: "Last Run on "},
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
           style={{'background': 'black', 'color': 'white'}}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              style={{'background': 'black', 'color': 'white'}}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? "none" : "default"}
                style={{'background': 'black', 'color': 'white'}}
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

//create the main button tool bar
const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
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

let TestTableToolbar = props => {
  const { numSelected, classes, AddAPI, Edit, 
          Refresh, Delete, Run} = props;

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
                Run {" "+numSelected+ " API"}
                <PlayArrowIcon className={classes.rightIcon} />
              </Button>
            </Tooltip>
            {numSelected === 1 ?(
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
            </Tooltip>): null}
            <Tooltip title="Delete selected test">
              <Button variant="contained" color="secondary" aria-label="Delete"
              className={classes.button}
              onClick={Delete}>
                Delete {" "+numSelected+ " API"}
                <DeleteIcon className={classes.rightIcon} />
              </Button>
            </Tooltip>
            
          </div>
        ) : (
          <div className="AppBarButtons">
          
           <Tooltip title="Refresh display">
              <Button variant="contained"  aria-label="Refresh"
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

TestTableToolbar = withStyles(toolbarStyles)(TestTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

const url = "https://www.nzbeta.com/" //name of our server 

class TestTable extends Component {
 
  constructor(props){
    super(props)
    this.state = {
          selected: [],
          data: [],
          isLoading: true,
          error: null,
          errMsg: "Loading data, please wait..."
    };

    this.fetchDashData = this.fetchDashData.bind(this);
    this.postDeleteAPI = this.postDeleteAPI.bind(this);
    this.postRunAPI = this.postRunAPI.bind(this);
  }
  
  //the codes for loading data form back end as follows 
  componentDidMount() {
    if(localStorage.getItem('jwtToken')){
      this.fetchDashData()
    }
    else this.setState({errMsg: "Missing Token", error: "missing token"});
  }

  //for getting api dash board data
  fetchDashData(){
    let testTable = this;
    this.setState({ isLoading: true, errMsg: "Loading data, please wait...", error: null });
    let path = 'api/v1/dashboard'

    let bod = { "token": localStorage.getItem('jwtToken') };

    axios.post(url + path , bod)
      .then(function (response) {
        console.log("in axios testsdash")
        console.log(response.data.data)
        testTable.setState({ data: response.data.data
          , isLoading: false })
      })
      .catch(function (error) {
        testTable.setState({ error, isLoading: false, errMsg: "Failed to load data" })
      });
  }
  
  //for sending the deleted to backend
  postDeleteAPI(){
    let testTable = this
    let path = "api/v1/apis/invert_lock"
    let bod = { "token": localStorage.getItem('jwtToken'), "selected_ids": testTable.state.selected };
    console.log(bod)
    axios.post(url + path , bod)
      .then(function (response) {
        console.log("in axios postDelete")
        console.log(response)
        if(response.data.data.message === "OK"){
          this.doRemoveDelete();  
        } 
      })
      .catch(function (error) {
        testTable.setState({ error, isLoading: false, errMsg: "Failed to Post delete data" })
      });
     
  } 
  
  //remove the deleted api from the 
  doRemoveDelete(){
    let newTable = [];
    newTable = this.state.data;

    this.state.selected.map((item) =>{
      newTable = newTable.filter((fItem) => fItem.path_id !==item.path_id)
    })
    console.log("in removedelete")
    this.setState({data: newTable, selected: []});
  }

  //sending the run now api to backend
  postRunAPI(){
    let testTable = this
    let path = "api/v1/apis/run_selected"
    let bod = { "token": localStorage.getItem('jwtToken'), "selected_ids": testTable.state.selected };
    console.log(bod)
    axios.post(url + path , bod)
      .then(function (response) {
        console.log("in axios postRun")
        console.log(response)
        
      })
      .catch(function (error) {
        testTable.setState({ error, isLoading: false, errMsg: "Failed to Post run data" })
      });
  } 

  doUpdateRun(){

  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.path_id) }));
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
    console.log(newSelected)
    this.setState({ selected: newSelected });
  };

  //grabbing the selected api object to pass to edit  
  getSelectedAPIObj(){

    let myAPI = {};
    let id = this.state.selected[0];
    if(this.state.selected.length > 0 ){
      console.log(id)
      myAPI = this.state.data.find((item) => {if(item.path_id === id){                                                   
        return item;
        }});
      }
      return myAPI;
    }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, handleAddAPI, handleEdit, 
     } = this.props;
    
    const { data, selected, isLoading, error, errMsg} = this.state;
    
    return (
      <Paper className={classes.root}>
        {isLoading || error ? <h1> {errMsg} </h1>
        :<Fragment> <TestTableToolbar numSelected={selected.length}
                          AddAPI={handleAddAPI}
                          Edit={() => handleEdit(this.getSelectedAPIObj())} 
                          Refresh={this.fetchDashData}
                         />

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TestTableHead
              numSelected={selected.length}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={data.length}
            />
            <TableBody>
              {data.map(dataItem => {
                  const isSelected = this.isSelected(dataItem.path_id);
                  var lastRun = new Date(parseInt(dataItem.timestamp))
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, dataItem.path_id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={+dataItem.path_id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell numeric component="th" scope="row" padding="none">
                        {+dataItem.path_id}
                      </TableCell>
                      <TableCell>{dataItem.passed > 0 ? "Pass": "Fail"}</TableCell>
                      <TableCell >{lastRun.toLocaleString()}</TableCell>
                      <TableCell >{dataItem.method}</TableCell>
                      <TableCell >{dataItem.protocol+"//"+dataItem.domain+"/"+dataItem.path}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        </Fragment>
        }
      </Paper>
    );
  }
}

TestTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TestTable);

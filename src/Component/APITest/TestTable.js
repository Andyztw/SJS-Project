import React, {Component} from "react";
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
  { id: "protocol", numeric: false, disablePadding: false, label: "Protocol" },
  { id: "host", numeric: false, disablePadding: false, label: "Host path" },
  { id: "path", numeric: false, disablePadding: false, label: "API path" },
  { id: "params", numeric: false,  disablePadding: false, label: "Parameters" },
  { id: "headers", numeric: false,  disablePadding: false, label: "Headers" }
];

//a custmized header row for the table
class TestTableHead extends Component {
  //   // componentWillMount() { 
  //   //   this.testDash();
  //   // } 
  
  //   testDash(){
  //   let currentCom = this;  
  //   let url = "https://www.nzbeta.com/";
  //   let myDash = {};
  //   console.log(JSON.stringify({"token": localStorage.getItem('jwtToken')}))  
  //    fetch(url+'api/v1/dashboard', {
  //      method: 'POST',
  //      headers: {
  //              //"Content-Type": "application/json; charset=utf-8",
  //               "Content-Type": "application/x-www-form-urlencoded",
  //               //"Accept" : 'application/json',
  //               //'Content-Type': 'application/json'
  //          },
  //     //body: JSON.stringify({"token": localStorage.getItem('jwtToken')}),
  //     body: "token="+localStorage.getItem('jwtToken'),
  //   }).then(function(response) {
  //     return response.json();
  //   }).then(function(data) {
  //     console.log("in testDash setting states")
  //       console.log(data.data)
  //       myDash = data.data;
  //       currentCom.setState({data: myDash, isLoading : false})
  //       console.log("after setting state")
  //       console.log(currentCom.state)
  //       console.log(new Date(1537138807723).toLocaleString())
  //   });
  // }    

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

class TestTable extends Component {
  state = {
    selected: [],
    data: [{id: 1, testRes: "PASS", time: new Date(1537138807723).toLocaleString(),
              method: "POST", protocol: "https://",
              host: "www.betanz.com/", 
              path: "api/users/login",
              paraList: [{key: "username", value: "test" },{key: "password", value: "test" }],
              headerList: [{key: "Accept", value:"application/Json"},{key: "agent",value:"Mozilla"}, {key: "Content-Type", value:"application/Json"}],
            }]
  };

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

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, handleAddAPI, handleEdit, 
      handleRefresh, handleDelete, handleRun, APIData } = this.props;
    const { data, selected} = this.state;
      console.log("inside test table render")
      console.log(this.props)  
    return (
      <Paper className={classes.root}>
        <TestTableToolbar numSelected={selected.length}
                          AddAPI={handleAddAPI}
                          Edit={handleEdit} 
                          Refresh={handleRefresh}
                          Delete={handleDelete} 
                          Run={handleRun}/>

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TestTableHead
              numSelected={selected.length}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={data.length}
            />
            <TableBody>
              {data.map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell numeric component="th" scope="row" padding="none">
                        {n.id}
                      </TableCell>
                      <TableCell>{n.testRes}</TableCell>
                      <TableCell >{n.time}</TableCell>
                      <TableCell >{n.method}</TableCell>
                      <TableCell >{n.protocol}</TableCell>
                      <TableCell >{n.host}</TableCell>
                      <TableCell >{n.path}</TableCell>
                      <TableCell ><ListDisplay name={"Parameters"} 
                                    data={n.paraList}></ListDisplay>
                      </TableCell>
                      <TableCell ><ListDisplay name={"Headers"} 
                                    data={n.headerList}></ListDisplay>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

TestTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TestTable);

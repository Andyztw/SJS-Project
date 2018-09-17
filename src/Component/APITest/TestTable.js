import React, {Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import CachedIcon from '@material-ui/icons/Cached';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import EditIcon from '@material-ui/icons/Edit'

let counter = 0;
function createData(name, API, lastRun, FPass, UpPer) {
  counter += 1;
  return { id: counter, name, API, lastRun, FPass, UpPer };
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => b[orderBy] - a[orderBy]
    : (a, b) => a[orderBy] - b[orderBy];
}

const rows = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Test Name"
  },
  { id: "APIName", numeric: false, disablePadding: false, label: "API Tested" },
  { id: "LastRun", numeric: true, disablePadding: false, label: "Last Run" },
  { id: "FailPass", numeric: true, disablePadding: false, label: "Pass/Fail" },
  { id: "UpTime", numeric: true, disablePadding: false, label: "Up Time %" }
];

class EnhancedTableHead extends Component {
    state = {
      data: [],
      isLoading: true
    };

    // componentWillMount() { 
    //   this.testDash();
    // } 
  
    testDash(){
    let currentCom = this;  
    let url = "https://www.nzbeta.com/";
    let myDash = {};
    console.log(JSON.stringify({"token": localStorage.getItem('jwtToken')}))  
     fetch(url+'api/v1/dashboard', {
       method: 'POST',
       headers: {
               //"Content-Type": "application/json; charset=utf-8",
                "Content-Type": "application/x-www-form-urlencoded",
                //"Accept" : 'application/json',
                //'Content-Type': 'application/json'
           },
      //body: JSON.stringify({"token": localStorage.getItem('jwtToken')}),
      body: "token="+localStorage.getItem('jwtToken'),
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log("in testDash setting states")
        console.log(data.data)
        myDash = data.data;
        currentCom.setState({data: myDash, isLoading : false})
        console.log("after setting state")
        console.log(currentCom.state)
        console.log(new Date(1537138807723).toLocaleString())
    });
  }    

  
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };



  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Report of test"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

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
    width: 200
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 30,
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

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
              className={classes.button}>
                Refresh Now 
                <CachedIcon className={classes.rightIcon} />
              </Button>
            </Tooltip>
            <Tooltip title="Run Selected Test">
              <Button
                variant="contained"
                color="primary"
                aria-label="Selected Run"
                className={classes.button}
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
                className={classes.button}
              >
                Edit API
                <EditIcon className={classes.rightIcon} />
              </Button>
            </Tooltip>): null}
            <Tooltip title="Delete selected test">
              <Button variant="contained" color="secondary" aria-label="Delete"
              className={classes.button}>
                Delete {" "+numSelected+ " API"}
                <DeleteIcon className={classes.rightIcon} />
              </Button>
            </Tooltip>
            
          </div>
        ) : (
          <div className="AppBarButtons">
          
           <Tooltip title="Refresh display">
              <Button variant="contained"  aria-label="Refresh"
              className={classes.button}>
                Refresh Now 
                <CachedIcon className={classes.rightIcon} />
              </Button>
            </Tooltip>
          </div>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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

class EnhancedTable extends React.Component {
  state = {
    order: "asc",
    orderBy: "name",
    selected: [],
    data: [
      createData("Test Login", "Login.js", 60, 1, 95.8),
      createData("Test Registeration", "Register.js", 25.0, 1, 99.9),
      createData("Get user name", "retrieve_user", 16.0, 0, 96.0),
      createData("Get user info", "retrieve_info", 6.0, 0, 94.3),
      createData("Post new user info", "post_new_user", 1, 49, 89.9),
      createData("search by pay", "Search?byPay", 3.2, 1, 96.6),
      createData("Search by industry", "Search?byIndustry", 9.0, 1, 99),
      createData("Search Employer", "Search?byEmployer", 0.0, 1, 100)
    ],
    page: 0,
    rowsPerPage: 7
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
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

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
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
                      <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell>{n.API}</TableCell>
                      <TableCell numeric>{n.lastRun}</TableCell>
                      <TableCell numeric>{n.FPass}</TableCell>
                      <TableCell numeric>{n.UpPer}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);

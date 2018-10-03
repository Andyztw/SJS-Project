import React, {Component} from 'react'
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from '@material-ui/core/Checkbox';

//we set name and other settings of the column header for the table here
const rows = [
    { id: "id", numeric: true, disablePadding: true, label: "ID"},
    { id: "url", numeric: false, disablePadding: false, label: "Full URL of API" },
    { id: "method", numeric: false, disablePadding: false, label: "Method" },
    { id: "time", numeric: false, disablePadding: false, label: "Last Run on " },
    { id: "testRes ", numeric: false, disablePadding: false, label: " Test Result" }
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

  export default TestTableHead;
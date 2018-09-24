import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import TextField from "@material-ui/core/TextField";

//a helper component for use by addAPI and editAPI component to handle their list of parameters and header and their editing.
const row = (
  dataObj,
  dataIndex,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing,
) => {
  const currentlyEditing = editIdx === dataIndex;
  return (
    <TableRow key={`tr-${dataIndex}`}hover>
      {header.map((y, k) => (
        <TableCell key={`trc-${k}`} >
          {currentlyEditing ? (
            <TextField
              name={y.prop}
              onChange={e => handleChange(e, y.prop, dataIndex)}
              value={dataObj[y.prop]}
            />
          ) : (
            dataObj[y.prop]
          )}
        </TableCell>
      ))}
      <TableCell>
        {currentlyEditing ? (
          <IconButton onClick={() => stopEditing()}>
            <DoneIcon />
            </IconButton>
        ) : (
          <div>
          <IconButton onClick={() => startEditing(dataIndex)}>
            <EditIcon />
            </IconButton>

              <IconButton onClick={() => handleRemove(dataIndex)}>
                <DeleteIcon />
                </IconButton>
              </div>
        )}
      </TableCell>

    </TableRow>
  );
};

export default ({
  data,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing
}) => (
  <Table>
    <TableBody>
      {data.map((dataObj, dataIndex) =>
        row(
          dataObj,
          dataIndex,
          header,
          handleRemove,
          startEditing,
          editIdx,
          handleChange,
          stopEditing
        )
      )}
    </TableBody>
  </Table>
);

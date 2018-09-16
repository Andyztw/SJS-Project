import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import TextField from "@material-ui/core/TextField";

const row = (
  dataObj,
  dataIndex,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing,
  cancelEditing
) => {
  const currentlyEditing = editIdx === dataIndex;
  return (
    <TableRow key={`tr-${dataIndex}`}>
      {header.map((y, k) => (
        <TableCell key={`trc-${k}`}>
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

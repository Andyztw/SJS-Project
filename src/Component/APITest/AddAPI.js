import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Table from './Table';

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },

  menuField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit,
    width: 150
  }
});

const style = {
  Paper_List: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    height: 200,
    overflowY: 'auto'
  }
}

const protocols = [
  {
    value: "http://",
    label: "HTTP"
  },
  {
    value: "https://",
    label: "HTTPS"
  }
];

const methods = [
  {
    value: "GET",
    label: "GET"
  },
  {
    value: "POST",
    label: "POST"
  }
];

class AddAPI extends Component {
  state = {
    method: "GET",
    protocol: "http://",
    host: "www.SJS.co.nz",
    path: "src/api",
    paraKey : "Key",
    pValue: "Value",
    paraList: [],
    headerList: [],
    hKey: "User-agent",
    hValue: "Mozilla",
    editIdx: -1,
    editIdxHeader : -1
  };

  constructor(props){
      super(props);
  }

  createAPI(){
    let thisAPI = {method: "GET",
    protocol: "http://",
    host: "www.SJS.co.nz",
    path: "src/api",
    paraKey : "Key",
    pValue: "Value",
    paraList: [],
    headerList: []};
    return thisAPI;
  }

  handleParaRemove = i => {
    this.setState(state => ({
      paraList: state.paraList.filter((row, j) => j !== i)
    }));
  };

  startParaEditing = i => {
    this.setState({ editIdx: i });
  };

  stopParaEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleParaChange = (e, name, i) => {
    const { value } = e.target;
    this.setState(state => ({
      paraList: state.paraList.map(
        (row, j) => (j === i ? { ...row, [name]: value } : row)
      )
    }));
  };

  handleHeaderRemove = i => {
    this.setState(state => ({
      headerList: state.headerList.filter((row, j) => j !== i)
    }));
  };

  startHeaderEditing = i => {
    this.setState({ editIdxHeader: i });
  };

  stopHeaderEditing = () => {
    this.setState({ editIdxHeader: -1 });
  };

  handleHeaderChange = (e, name, i) => {
    const { value } = e.target;
    this.setState(state => ({
      headerList: state.headerList.map(
        (row, j) => (j === i ? { ...row, [name]: value } : row)
      )
    }));
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  createParaList = () => {
    var para = { key: this.state.paraKey, value: this.state.pValue };

    var list = this.state.paraList;
    list.push(para);
    // if (this.state.initP) {
    //   list.shift(); //if its the initial parameter, remove the placeholder
    //   this.setState({ initP: false }); //set the flag to be false
    // }
    this.setState(
      {
        paraList: list,
      });
  };

  createHeaderList = () => {
    let header = {key: this.state.hKey, value : this.state.hValue};

    var list = this.state.headerList;
    list.push(header);
    // if (this.state.initB) {
    //   list.shift(); //if its the initial parameter, remove the placeholder
    //   this.setState({ initB: false }); //set the flag to be false
    // }
    this.setState(
      {
        headerList: list,
      });
  };

  // handleParaOnDelete = id =>{
  //   this.setState(({ paraList }) => ({
  //     paraList: paraList.filter(ex => ex.id !== id),
  //   }));
  // }
  //
  // handleHeaderOnDelete = id =>{
  //   this.setState(({ headerList }) => ({
  //     headerList: headerList.filter(ex => ex.id !== id),
  //   }));
  // }

  render() {
    const { classes, handleAdd, handleCancel } = this.props;
    const {
      protocol,
      host,
      path,
      method,
      paraKey,
      pValue,
      hKey,
      hValue
    } = this.state;

    return (
      <div>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={8}>
        <Typography variant="display1" gutterBottom>
          Adding A new API into the System
        </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
        <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={()=>handleAdd(this.createAPI())}>
              Add API 
            </Button>
        
        </Grid>
        
        <Grid item xs={12} sm={2}>
        <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleCancel} >
              Cancel
            </Button>
            </Grid>
        
          <Grid item xs={12}>
            <Typography variant="title">Add API Path</Typography>
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              id="Method"
              select
              label="Method Selection"
              className={classes.menuField}
              value={method}
              onChange={this.handleChange("method")}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Select the Method for API"
              margin="normal"
            >
              {methods.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              id="Protocol"
              select
              label="Protocol Selection"
              className={classes.menuField}
              value={protocol}
              onChange={this.handleChange("protocol")}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Select the protocol for the path"
              margin="normal"
            >
              {protocols.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              onChange={this.handleChange("host")}
              id="Host"
              label="Host Path"
              value={host}
              className={classes.textField}
              helperText="Host Address of API"
              margin="normal"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              onChange={this.handleChange("path")}
              id="APIPath"
              label="API Path"
              value={path}
              className={classes.textField}
              helperText="Path of API"
              margin="normal"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              InputProps={{
                readOnly: true
              }}
              disabled
              value={protocol + host + path}
              label="Preview path"
              id="DiplayPath"
              name="DisplayPath"
              fullWidth
              helperText="Current entered Path of API"
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="title">Add Parameters</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="title">Add Header</Typography>
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              onChange={this.handleChange("paraKey")}
              id="paraKey"
              value={paraKey}
              label="Parameter Key"
              className={classes.textField}
              helperText="Name of the paramemter"
              margin="normal"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              onChange={this.handleChange("pValue")}
              id="pValue"
              value={pValue}
              label="Parameter Value"
              className={classes.textField}
              helperText="Value of the paramter"
              margin="normal"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() =>{this.createParaList()
                          }}
            >
              Add Parameter
            </Button>
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              onChange={this.handleChange("hKey")}
              id="hKey"
              value={hKey}
              label="Header Key"
              className={classes.textField}
              helperText="name of Header"
              margin="normal"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              onChange={this.handleChange("hValue")}
              id="hValue"
              value={hValue}
              label="Header Value"
              className={classes.textField}
              helperText="Value of Header"
              margin="normal"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() =>{this.createHeaderList();
                        }}
            >
              Add Header
            </Button>
          </Grid>


          <Grid item xs={12} sm={6}>
          <Paper style={style.Paper_List}>
          <Table
            handleRemove={this.handleParaRemove}
            startEditing={this.startParaEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopParaEditing}
            handleChange={this.handleParaChange}
            data={this.state.paraList}
            header={[
         {
           name: "Parameter key",
           prop: "key"
         },
         {
           name: "Parameter Value",
           prop: "value"
         }
       ]}
     />
              </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
          <Paper style={style.Paper_List}>
          <Table
            handleRemove={this.handleHeaderRemove}
            startEditing={this.startHeaderEditing}
            editIdx={this.state.editIdxHeader}
            stopEditing={this.stopHeaderEditing}
            handleChange={this.handleHeaderChange}
            data={this.state.headerList}
            header={[
         {
           name: "Header key",
           prop: "key"
         },
         {
           name: "Header Value",
           prop: "value"
         }
       ]}
     />
              </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

AddAPI.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddAPI);

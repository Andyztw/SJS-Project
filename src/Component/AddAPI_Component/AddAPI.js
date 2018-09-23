import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Table from '../Support_Component/Table';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const url = "https://www.nzbeta.com/" //the server url

//set the style of the textfields and other inputs
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

//set the style for the overall container of the panel
const style = {
  Paper_List: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    height: 200,
    overflowY: 'auto'
  }
}

//set the list of options for protocol and methods here
const protocols = [
  {
    value: "HTTP",
    label: "HTTP"
  },
  {
    value: "HTTPS",
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
  //set some initial values in the various inputs
  state = {
    response: {}, //this holds the response back from post action for checking error status and stuff
    method: "GET",
    protocol: "http",
    domain: "www.SJS.co.nz",
    path: "src/api",
    paraKey: "Key",
    pValue: "Value",
    paraList: [],
    headerList: [],
    hKey: "User-agent",
    hValue: "Mozilla",
    editIdx: -1, //set the index for when editing entry the parameter list 
    editIdxHeader: -1, //set the index for editing entry in the header list
    dialogOpen: false  //set the confirmation dialog to be close by default
  };

  handleDialogClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  postToAddAPI() {
    let self = this;
    let bod = this.createAPI();

    axios.post(url + 'api/v1/apis/add_api', bod)
      .then(function (response) {
        self.setState({
          dialogOpen: true, response: response
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //creates the body Json object for the post to add api backend
  createAPI() {
    let thisAPI = {
      "token": localStorage.getItem('jwtToken'),
      "method": this.state.method,
      "protocol": this.state.protocol,
      "domain": this.state.domain,
      "path": this.state.path,
      "requests": {
        "header": this.createRequestFromList(this.state.headerList),
        "params": this.createRequestFromList(this.state.paraList)
      },
      "responses": { "status_code": 200 }
    };
    
    return thisAPI;
  }

  //reformat the list of params and headers into api acceptable format
  createRequestFromList(list) {
    let request = "{";

    list.map((Item, index, list) => {
      var myPairs = "\"" + Item.key + "\" : \"" + Item.value + "\"";
      request += myPairs;
      if (index < list.length - 1)
        request += ", ";
    })

    request += "}";
    
    return JSON.parse(request)
  }

  //removes the selected parameter from the list when user click on its trash icon
  handleParaRemove = i => {
    this.setState(state => ({
      paraList: state.paraList.filter((row, j) => j !== i)
    }));
  };

  //change the table row to be editable for parameters when user click on edit icon
  startParaEditing = i => {
    this.setState({ editIdx: i });
  };

  //stops the editing of parameters when user click on checked icon
  stopParaEditing = () => {
    this.setState({ editIdx: -1 });
  };

  //updates the state of parameter when it is changed
  handleParaChange = (e, name, i) => {
    const { value } = e.target;
    this.setState(state => ({
      paraList: state.paraList.map(
        (row, j) => (j === i ? { ...row, [name]: value } : row)
      )
    }));
  };

  //removes the selected header entry from headers array when user click on trash icon
  handleHeaderRemove = i => {
    this.setState(state => ({
      headerList: state.headerList.filter((row, j) => j !== i)
    }));
  };

  //change the entry on headers table to be editable for editing selected entry when user click on edit icon
  startHeaderEditing = i => {
    this.setState({ editIdxHeader: i });
  };

  //stops the editing of headers 
  stopHeaderEditing = () => {
    this.setState({ editIdxHeader: -1 });
  };

  //changed the state of headers to reflect the change
  handleHeaderChange = (e, name, i) => {
    const { value } = e.target;
    this.setState(state => ({
      headerList: state.headerList.map(
        (row, j) => (j === i ? { ...row, [name]: value } : row)
      )
    }));
  };

  //handles the changed in the various input and save them in the state
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  //add the new parameter value pair into the list of headers  
  createParaList = () => {
    var para = { key: this.state.paraKey, value: this.state.pValue }; //get the value of the textfield held inside state
    var list = this.state.paraList; //clone the current parameters array

    list.push(para);//add the new header into the arrray
    this.setState({ paraList: list }); //set the new array as the current array and call render to refresh
  };

  //add the new header value pair into the list of headers
  createHeaderList = () => {
    let header = { key: this.state.hKey, value: this.state.hValue }; //get the value of the textfield held inside state
    var list = this.state.headerList; //clone the current headers array

    list.push(header); //add the new header into the arrray
    this.setState({ headerList: list }); //set the new array as the current array and call render to refresh
  };

  render() {
    const { classes, handleAdd, handleCancel } = this.props;
    const {
      response, protocol, domain, path, method,
      paraKey, pValue, hKey, hValue, dialogOpen
    } = this.state;

    return (
      <Fragment>
        <div>
          <Dialog
            open={dialogOpen}
            onClose={this.handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Add more API?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              <pre>{JSON.stringify(response.data, null, 2)}</pre>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">
                Add more
            </Button>
              <Button onClick={handleAdd} color="primary" autoFocus>
                Finished
            </Button>
            </DialogActions>
          </Dialog>
        </div>
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
                onClick={() => this.postToAddAPI()}>
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
                onChange={this.handleChange("domain")}
                id="domain"
                label="domain Path"
                value={domain}
                className={classes.textField}
                helperText="domain Address of API"
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
                value={protocol + "://" + domain + "/" + path}
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
                onClick={() => {
                  this.createParaList()
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
                onClick={() => {
                  this.createHeaderList();
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
      </Fragment>
    );
  }
}

AddAPI.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddAPI);

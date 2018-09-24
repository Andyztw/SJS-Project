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

import { url, editApi } from "../BackEnd/BackEndDataServices";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    margin: theme.spacing.unit,
    width: 150
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
  }
});

const style = {
  Paper_List: {
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    height: 200,
    overflowY: 'auto'
  }
}

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

class EditAPI extends Component {

  state = {
    response: {}, //this holds the response back from post action for checking error status and stuff
    editIdx: -1,
    editIdxHeader : -1
  };

  constructor(props){
      super(props);
      this.initState();

  }

  initState(){
    const {Editing} = this.props;
    let user_req = {};
    if(Editing.user_req !== undefined || Editing.user_req !== null){
      user_req = Editing.user_req;
    }
    user_req = JSON.parse(user_req)
    
    this.state = {
      dialogOpen: false,  //set the confirmation dialog to be close by default
      id: Editing.id,
      method: Editing.method,
      protocol: Editing.protocol,
      domain: Editing.domain,
      path: Editing.path,
      paraKey: "key",
      pValue: "Value",
      paraList: (user_req.params === undefined? []:this.createArrayList(user_req.params)),
      headerList: (user_req.header === undefined? []:this.createArrayList(user_req.header)),
      hKey: "User-agent",
      hValue: "Mozilla",
    };
  }

  handleDialogClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  createArrayList(inObj){
    
    //check if we actually have some values to work with
    if(inObj === null){
      return []; //return an empty array if none
    }
    //else we create the array of [{key: key , value : value}]
    let objectArg = inObj
    
    let arrKeys = Object.keys(objectArg)
    let arrValues = Object.values(objectArg)
    let objJson ="["
    
    arrKeys.map((item, index, arrKeys) =>{
      var mykey = arrKeys[index];
      var value = arrValues[index];
      objJson += "{ \"key\": \""+mykey+"\", \"value\" : \""+value+"\"}";
      if(index < (arrKeys.length-1)){
        objJson +=","
      }
    })
    objJson +="]"
    
    return JSON.parse(objJson);
  }

  postToEditAPI(){
    let self = this;
    let bod = this.createAPI();
    
    axios.post(url + editApi, bod)
      .then(function (response) {
        self.setState({
          dialogOpen: true, response: response
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //creates the body for the post to add api backend
  createAPI(){
    let thisAPI = {
    "token": localStorage.getItem('jwtToken'),  
    "path_id": this.state.id,
    "method": this.state.method,
    "protocol": this.state.protocol,
    "domain": this.state.domain,
    "path": this.state.path,
    "requests": {"header": this.createRequestFromList(this.state.headerList), 
                  "params": this.createRequestFromList(this.state.paraList)},
    "responses":{"status_code":200}
    };
    
    return thisAPI;
  }

  //reformat the list of params and headers into api acceptable format
  createRequestFromList(list){
    let request = "{";

    list.map((Item, index, list) => {
      var myPairs = "\""+Item.key+ "\" : \""+Item.value+ "\""; 
      request += myPairs;
      if(index < list.length-1)
      request +=", ";
    })

    request +="}";
    
    return JSON.parse(request) 
  }

  handleParaRemove = i => {
    this.setState(state => ({
      paraList: state.paraList.filter((row, j) => j !== i)
    }));
  };

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
   
    this.setState(
      {
        paraList: list,
      });
  };

  createHeaderList = () => {
    let header = {key: this.state.hKey, value : this.state.hValue};

    var list = this.state.headerList;
    list.push(header);
    
    this.setState(
      {
        headerList: list,
      });
  };

  render() {
    const { classes, handleEditAPI, handleCancel } = this.props;
    const {
      protocol, domain, path, method, paraKey, pValue, 
      hKey, hValue, dialogOpen, response 
          } = this.state;
       console.log(dialogOpen)  
       console.log(response) 
    return (
      <Fragment>
        <div>
          <Dialog
            open={dialogOpen}
            onClose={this.handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Continue to Edit API?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              <pre>{JSON.stringify(response, null, 2)}</pre>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">
                 Continue Edit
            </Button>
              <Button onClick={handleEditAPI} color="primary" autoFocus>
                Finished
            </Button>
            </DialogActions>
          </Dialog>
        </div>
      <div>
        <Grid container spacing={8}>
         <Grid item xs={12} sm={8}>
         <Typography variant="display1" gutterBottom>
          Editing current API
          </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() =>{this.postToEditAPI()
                          }}
            >
              Save Change 
            </Button>
        
            </Grid>
            <Grid item xs={12} sm={2}>
        <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            </Grid>

          <Grid item xs={12}>
            <Typography variant="title">Edit API Path</Typography>
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
              value={protocol +"://"+ domain +"/"+ path}
              label="Preview path"
              id="DiplayPath"
              name="DisplayPath"
              fullWidth
              helperText="Current entered Path of API"
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="title">Edit Parameters</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="title">Edit Header</Typography>
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
      </Fragment>
    );
  }
  }

EditAPI.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditAPI);

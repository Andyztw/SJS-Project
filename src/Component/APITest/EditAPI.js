import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import Table from './Table';
import axios from 'axios';
import ResponsePanel from './ResponsePanel'

const url = "https://www.nzbeta.com/"

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

class EditAPI extends Component {

  state = {
    editIdx: -1,
    editIdxHeader : -1
  };

  constructor(props){
      super(props);
      this.initState();

  }

  initState(){
    const {Editing} = this.props;
    
    let user_req = JSON.parse(Editing.user_req)
    console.log(typeof user_req.header)
    console.log(typeof user_req.params)

    this.state = {
      path_id: Editing.path_id,
      method: Editing.method,
      protocol: Editing.protocol,
      host: Editing.domain,
      path: Editing.path,
      paraKey: "key",
      pValue: "Value",
      paraList: (user_req.params === undefined? []:this.createArrayList(user_req.params)),
      headerList: (user_req.header === undefined? []:this.createArrayList(user_req.header)),
      hKey: "User-agent",
      hValue: "Mozilla",
    };
  }

  createArrayList(inObj){
    
    //check if we actually have some values to work with
    if(inObj === null){
      return []; //return an empty array if none
    }
    //else we create the array of [{key: key , value : value}]
    let myArr = []
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
    console.log(JSON.parse(objJson))
    return JSON.parse(objJson);
  }

  postToEditAPI(){
    let bod = this.createAPI();
    console.log(bod)
    axios.post(url + 'api/v1/apis/edit_api', bod)
      .then(function (response) {
        console.log("in axios")
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //creates the body for the post to add api backend
  createAPI(){
    let thisAPI = {
    "token": localStorage.getItem('jwtToken'),  
    "path_id": this.state.path_id,
    "method": this.state.method,
    "protocol": this.state.protocol,
    "domain": this.state.host,
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
    console.log(request)
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
    const { classes, handleEditApi, handleCancel } = this.props;
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
          <Grid item xs={12} sm={12}>
          <ResponsePanel />
          </Grid>
        </Grid>
      </div>
    );
  }
  }

EditAPI.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditAPI);

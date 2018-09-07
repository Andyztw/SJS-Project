import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    margin: theme.spacing.unit
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
    initP: true,
    initB: true,
    method: "GET",
    protocol: "http://",
    host: "www.SJS.co.nz",
    path: "src/api",
    Pkey: "key",
    Pvalue: "Value",
    paraList: [{ key: "key", value: "value" }],
    pPreview: "key: value;",
    headerList: ["User-agent: Mozilla"],
    Hbody: "User-agent: Mozilla",
    HeaderP: "cookies: key=value"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  createParaList = () => {
    var para = { key: this.state.Pkey, value: this.state.Pvalue };

    var list = this.state.paraList;
    list.push(para);
    if (this.state.initP) {
      list.shift(); //if its the initial parameter, remove the placeholder
      this.setState({ initP: false }); //set the flay to be false
    }
    this.setState(
      ({
        paraList: list
      },
      () => {
        this.getParaList();
      })
    );
  };

  getParaList = () => {
    var preview = "";

    this.state.paraList.map(para => {
      preview += para.key;
      preview += ": ";
      preview += para.value;
      preview += ", ";
    });
    this.setState({ pPreview: preview });
  };

  createHeaderList = () => {
    var header = this.state.Hbody;

    var list = this.state.headerList;
    list.push(header);
    if (this.state.initB) {
      list.shift(); //if its the initial parameter, remove the placeholder
      this.setState({ initB: false }); //set the flay to be false
    }
    this.setState(
      ({
        headerList: list
      },
      () => {
        this.getHeaderList();
      })
    );
  };

  getHeaderList = () => {
    var preview = "";

    this.state.headerList.map(head => {
      preview += head;
      preview += "; ";
    });
    this.setState({ HeaderP: preview });
  };

  render() {
    const { classes } = this.props;
    const {
      protocol,
      host,
      path,
      method,
      Pkey,
      Pvalue,
      pPreview,
      Hbody,
      HeaderP
    } = this.state;

    return (
      <div>
        <Typography variant="display1" gutterBottom>
          Adding A new API into the System.
        </Typography>

        <Grid container spacing={8}>
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
              onChange={this.handleChange("Pkey")}
              id="Pkey"
              value={Pkey}
              label="Parameter Key"
              className={classes.textField}
              helperText="Name of the paramemter"
              margin="normal"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              onChange={this.handleChange("Pvalue")}
              id="Pvalue"
              value={Pvalue}
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
              onClick={this.createParaList.bind(this)}
            >
              Add Paramter
            </Button>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              onChange={this.handleChange("Hbody")}
              id="Hkey"
              value={Hbody}
              label="Header Body"
              className={classes.textField}
              helperText="content of header "
              margin="normal"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.createHeaderList.bind(this)}
            >
              Add Header
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              InputProps={{
                readOnly: true
              }}
              disabled
              id="Preview"
              label="Preview of parameters"
              multiline
              rows="4"
              value={pPreview}
              className={classes.textField}
              margin="normal"
              helperText="Current entered parameters"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              InputProps={{
                readOnly: true
              }}
              disabled
              id="HeaderP"
              label="Preview of Header"
              multiline
              rows="4"
              value={HeaderP}
              className={classes.textField}
              margin="normal"
              helperText="Current entered Header"
              fullWidth
            />
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

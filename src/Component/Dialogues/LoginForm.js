import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200
  }
});

class InputAdornments extends React.Component {
  state = {
    userName: "",
    password: "",
    showPassword: false
  };

  constructor({ onSubmit }) {
    super(onSubmit);
    this.setState({ userName: "", password: "", showPassword: false });
  }

  handleChange = (prop, event) => {
    this.setState({ [prop]: event.target.value });
    this.onSubmit(this.state.userName, this.state.password);
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClear = () => {
    this.setState({ userName: "" });
    this.setState({ password: "" });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl
          margin="normal"
          className={classNames(classes.margin, classes.textField)}
        >
          <InputLabel htmlFor="adornment-userName">User Name</InputLabel>
          <Input
            id="adornment-userName"
            type="text"
            value={this.state.userName}
            onChange={this.handleChange("userName")}
          />
        </FormControl>
        <FormControl
          margin="normal"
          className={classNames(classes.margin, classes.textField)}
        >
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.password}
            onChange={this.handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    );
  }
}

InputAdornments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InputAdornments);

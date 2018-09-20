import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class ListDisplay extends Component {
  state = {
    anchorEl: null,
    data: []
  };

  constructor(props){
      super(props)
      this.state.data = this.props.data 
      this.state.name = this.props.name
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl, name, data } = this.state;
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {data.length+" items..."}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
            {data.map((row)=>{
                return(
              <MenuItem onClick={this.handleClose}>{row.key+" : "+row.value}</MenuItem>
                )
            })}
        </Menu>
      </div>
    );
  }
}

export default ListDisplay;
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
});

function ResponsePanel(props) {
  const { classes, response, type} = props;
  
  // const errCode = response.data.error;
  // const status = response.data.message;
  
  
  const repsonseP = type !=="Simple"
  ? (
  <ExpansionPanelActions>
    <Button size="small" color="primary">
      Clear All
    </Button>
  </ExpansionPanelActions>)
  : null

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>Response Results: </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{"Status code: "+" Message: "}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div>
          <Typography className={classes.secondaryHeading}>{JSON.stringify(response)}</Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        {repsonseP}
      </ExpansionPanel>
    </div>
  );
}

ResponsePanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResponsePanel);
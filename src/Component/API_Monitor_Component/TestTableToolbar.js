import React, { Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import CachedIcon from '@material-ui/icons/Cached';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'

//create the main button tool bar's styles 
const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === "light"
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.5)
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark
            },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: "0 0 auto"
    },
    button: {
        margin: theme.spacing.unit,
        width: 180
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 30,
    },
});

//create the toolbar to hold the main function buttons
class TestTableToolbar extends Component {


    render() {
        const { numSelected, classes, AddAPI, Edit,
            Refresh, Delete, Run } = this.props;

        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0
                })}
            >
                <div className={classes.actions}>

                    {numSelected > 0 ? (
                        <div className="AppBarButtons">
                            <Tooltip title="Refresh display">
                                <Button variant="contained" aria-label="Refresh"
                                    className={classes.button}
                                    onClick={Refresh}>
                                    Refresh Now
                  <CachedIcon className={classes.rightIcon} />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Add new API">
                                <Button variant="contained" aria-label="AddAPI"
                                    className={classes.button}
                                    color="primary"
                                    onClick={AddAPI}>
                                    Add New API
                  <AddIcon className={classes.rightIcon} />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Run Selected Test">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    aria-label="Selected Run"
                                    className={classes.button}
                                    onClick={Run}
                                >
                                    Run {" " + numSelected + " API"}
                                    <PlayArrowIcon className={classes.rightIcon} />
                                </Button>
                            </Tooltip>
                            {numSelected === 1 ? (
                                <Tooltip title="Edit selected API">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        aria-label="Edit"
                                        onClick={Edit}
                                        className={classes.button}
                                    >
                                        Edit API
                  <EditIcon className={classes.rightIcon} />
                                    </Button>
                                </Tooltip>) : null}
                            <Tooltip title="Delete selected test">
                                <Button variant="contained" color="secondary" aria-label="Delete"
                                    className={classes.button}
                                    onClick={Delete}>
                                    Delete {" " + numSelected + " API"}
                                    <DeleteIcon className={classes.rightIcon} />
                                </Button>
                            </Tooltip>

                        </div>
                    ) : (
                            <div className="AppBarButtons">

                                <Tooltip title="Refresh display">
                                    <Button variant="contained" aria-label="Refresh"
                                        className={classes.button}
                                        onClick={Refresh}>
                                        Refresh Now
                  <CachedIcon className={classes.rightIcon}
                                        />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Add new API">
                                    <Button variant="contained" aria-label="AddAPI"
                                        className={classes.button}
                                        color="primary"
                                        onClick={AddAPI}>
                                        Add New API
                  <AddIcon className={classes.rightIcon} />
                                    </Button>
                                </Tooltip>
                            </div>
                        )}
                </div>
            </Toolbar>
        );
    };
}

TestTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired
};

export default withStyles(toolbarStyles)(TestTableToolbar);
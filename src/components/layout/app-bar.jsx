import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: theme.spacing(1),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 200,
      "&:focus": {
        width: 280
      }
    }
  }
}));

export default function(props) {
  const classes = useStyles();
  const { navigateBack, searchText, onChange, onEnter } = props;

  return (
    <AppBar position="static">
      <Toolbar>
        <ArrowBackIcon onClick={navigateBack} />
        <Typography className={classes.title} variant="h6" noWrap>
          Gutendex App
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search Books…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            onChange={onChange}
            value={searchText}
            inputProps={{ "aria-label": "search" }}
            onKeyUp={event => {
              if (event.keyCode === 13) {
                event.preventDefault();
                onEnter();
              }
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

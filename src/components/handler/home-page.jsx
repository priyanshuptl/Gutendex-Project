import React from "react";
import PropTypes from "prop-types";
import List from "../layout/list";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  list: {
    width: "100%",
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      width: 300
    }
  }
}));

const HomePage = ({ genres = [], setGenre }) => {
  const classes = useStyles();
  return (
    <div className={classes.root + " home-page"}>
      <Typography className="home-page-title" variant="h4">
        Gutendex App
      </Typography>
      <Typography variant="h6">Select a book Genre</Typography>
      <List className={classes.list} items={genres} onSelect={setGenre} />
    </div>
  );
};

HomePage.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string)
};

export default HomePage;

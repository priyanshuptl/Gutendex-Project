import React from "react";
import PropTypes from "prop-types";
import AppBar from "../layout/app-bar";
import { Grid, Paper } from "@material-ui/core";

class BookList extends React.Component {
  render() {
    const { books=[] } = this.props;

    return (
      <React.Fragment>
        <AppBar />
        <Grid container spacing={3}>
          {books.map(({ title, image }) => (
            <Grid item xs={6} sm={3} md={2}>
              <Paper>xs=12</Paper>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

BookList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string)
};

export default BookList;

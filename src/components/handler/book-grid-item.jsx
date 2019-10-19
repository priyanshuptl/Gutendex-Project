import React from "react";
import { Grid, Typography } from "@material-ui/core";

const GridItem = ({ book }) => {
  const { title, authors = [], formats } = book;

  return (
    <Grid item xs={6} sm={3} md={2}>
      <img className="book-cover" src={formats["image/jpeg"]} alt="" />
      <Typography></Typography>
      <Typography variant="body1" gutterBottom>
        {title}
      </Typography>
      {authors.map(({ name }) => (
        <Typography variant="body2" gutterBottom>
          {name}
        </Typography>
      ))}
    </Grid>
  );
};

export default GridItem;

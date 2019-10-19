import React from "react";
import PropTypes from "prop-types";
import List from "../layout/list";

const HomePage = ({ genres=[] }) => (
  <React.Fragment>
    <h4>Select a book Genre</h4>
    <List items={genres} />
  </React.Fragment>
);

HomePage.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string)
};

export default HomePage;

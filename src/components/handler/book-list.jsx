import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import AppBar from "../layout/app-bar";
import GridItem from "./book-grid-item";

class BookList extends React.Component {
  state = {
    books: [],
    next: ""
  };

  componentDidMount() {
    const {
      url,
      location: { search: searchString, pathname }
    } = this.props;

    const link = `${url}${pathname}?${searchString}`;

    console.log("link", link);

    this.getData(link);
  }

  getData = url => {
    axios.get(url).then(response => {
      console.log("response", response);
      const { results, next } = response.data;

      const books = results.filter(({ formats }) => !!formats["image/jpeg"]);

      this.setState({
        books: [...this.state.books, ...books],
        next
      });
    });
  };

  render() {
    const { books, next } = this.state;
    const { navigateBack, searchBooks } = this.props;
    debugger;
    return (
      <React.Fragment>
        <AppBar navigateBack={() => navigateBack("/")} search={searchBooks} />
        <InfiniteScroll
          next={() => this.getData(next)}
          hasMore={!!books.length && !!next}
          loader={
            <div style={{ textAlign: "center" }}>
              <CircularProgress />
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Grid className="book-list" container spacing={3}>
            {books.map(book => (
              <GridItem book={book} key={"book:" + book.title} />
            ))}
          </Grid>
        </InfiniteScroll>
      </React.Fragment>
    );
  }
}

BookList.propTypes = {
  url: PropTypes.string
};

export default withRouter(BookList);

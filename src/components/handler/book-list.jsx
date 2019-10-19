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
    next: "",
    search: {
      topic: undefined,
      search: undefined
    }
  };

  componentDidMount() {
    const { genre, url, location: searchString, history } = this.props;

    const search = {
      formats: "image/jpeg",
      topic: genre,
      ...queryString.parse(searchString)
    };
    const query = queryString.stringify(search);
    history.push(query);

    this.getData(`${url}/books?${query}`);
    debugger;
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

    return (
      <React.Fragment>
        <AppBar />
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
  genres: PropTypes.arrayOf(PropTypes.string)
};

export default withRouter(BookList);

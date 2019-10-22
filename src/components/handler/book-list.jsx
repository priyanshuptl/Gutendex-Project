import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import debounce from "lodash.debounce";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "../layout/app-bar";
import GridList from "../layout/grid-list";
import { BookFormatLevel } from "../enums";

class BookList extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      books: [],
      next: "",
      searchText: "",
      topic: ""
    };

    window.onscroll = debounce(() => {
      const {
        loadBooks,
        state: { error, isLoading, hasMore, next }
      } = this;

      if (error || isLoading || !hasMore) return;

      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        loadBooks(next);
      }
    }, 100);
  }

  componentWillMount() {
    const {
      url,
      location: { search: searchString, pathname }
    } = this.props;

    const { search: searchText, topic } = queryString.parse(searchString);
    console.log("searchText", searchText);
    this.setState({ searchText, topic });

    const link = `${url}${pathname}${searchString}`;
    console.log("link", link);
    this.loadBooks(link);
  }

  loadBooks = link => {
    this.setState({ isLoading: true }, () => {
      Axios.get(link)
        .then(response => {
          console.log("response", response);
          const { results, next } = response.data;

          const books = results
            .filter(({ formats }) => !!formats["image/jpeg"])
            .map(({ id, formats, title, authors }) => ({
              id,
              img: formats["image/jpeg"],
              formats,
              title,
              author: authors[0] && authors[0].name
            }));

          if (next && books.length + this.state.books.length <= 30) {
            this.loadBooks(next);
          }

          this.setState({
            books: [...this.state.books, ...books],
            next,
            hasMore: !!next,
            isLoading: false
          });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            isLoading: false
          });
        });
    });
  };

  setSearchTextHandler = event => {
    const name = event.target.value;
    event.preventDefault();
    this.setState({ searchText: name });
  };

  onSearchHandler = () => {
    const {
      history,
      location: { search: searchString, pathname }
    } = this.props;

    const searchObj = {
      ...queryString.parse(searchString),
      search: this.state.searchText
    };

    history.push(`${pathname}?${queryString.stringify(searchObj)}`);
  };

  navigateBackHandler = path => {
    const { history } = this.props;
    history.push(path);
  };

  onClickGridItem = ({ formats, title }) => {
    let found = false;
    console.log("Clicked!", title);
    BookFormatLevel.forEach(format => {
      const formatLink = Object.keys(formats).find(bookFormat => {
        console.log("format", format);
        return bookFormat.includes(format);
      });
      console.log("formatLink", formatLink);
      if (formatLink) {
        window.location.replace(formats[formatLink]);
        console.log("formats[formatLink]", formats[formatLink]);
        found = true;
      }
    });
    if (!found) {
      this.setState({ errorMessage: "No viewable version available" });
    }
  };

  render() {
    const { error, hasMore, isLoading, books, searchText, topic } = this.state;

    return (
      <div>
        <AppBar
          navigateBack={() => this.navigateBackHandler("/")}
          onChange={this.setSearchTextHandler}
          onEnter={this.onSearchHandler}
          searchText={searchText}
        />
        <GridList
          tileData={books}
          subHeader={topic}
          onClickGridItem={this.onClickGridItem}
        ></GridList>
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        )}
        {!hasMore && <div>All the books have been loaded!</div>}
      </div>
    );
  }
}

BookList.propTypes = {
  url: PropTypes.string
};

export default withRouter(BookList);

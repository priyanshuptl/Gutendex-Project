import React from "react";
import queryString from "query-string";
import { Route, withRouter } from "react-router-dom";
import HomePage from "./components/handler/home-page";
import BookList from "./components/handler/book-list";
import "typeface-roboto";
import "./App.css";

const url = "http://skunkworks.ignitesol.com:8000";
const genres = [
  "Fiction",
  "Drama",
  "Humor",
  "Politics",
  "History",
  "Adventure"
];

class App extends React.Component {
  state = {
    genres,
  };

  setGenreHandler = genre => {
    const {
      history,
      location: { search: searchString }
    } = this.props;

    const searchObj = {
      ...queryString.parse(searchString),
      topic: genre,
      formats: "image/jpeg"
    };

    history.push(`/books?${queryString.stringify(searchObj)}`);
  };

  searchBooksHandler = name => {
    const {
      history,
      location: { search: searchString, pathname }
    } = this.props;

    const searchObj = {
      ...queryString.parse(searchString),
      search: name
    };

    history.push(`${pathname}?${queryString.stringify(searchObj)}`);
  };

  navigateBackHandler = path => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { genres } = this.state;

    const bookList = () => (
      <BookList
        url={url}
        navigateBack={this.navigateBackHandler}
        searchBooks={this.searchBooksHandler}
      />
    );
    const homePage = () => (
      <HomePage genres={genres} setGenre={this.setGenreHandler} />
    );

    return (
      <React.Fragment>
        <Route exact path="/" component={homePage} />
        <Route path="/books" component={bookList} />
      </React.Fragment>
    );
  }
}

export default withRouter(App);

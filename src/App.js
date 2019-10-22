import React from "react";
import queryString from "query-string";
import { Route, withRouter } from "react-router-dom";
import HomePage from "./components/handler/home-page";
import BookList from "./components/handler/book-list";
import { Genres, URL } from "./components/enums";
import "typeface-roboto";
import "./App.css";

class App extends React.Component {
  state = {
    genres: Genres,
    booksLoadingStarted: false
  };

  setGenreHandler = genre => {
    const {
      history,
      location: { search: searchString }
    } = this.props;

    const searchObj = {
      ...queryString.parse(searchString),
      topic: genre,
      mime_type: "image/jpeg"
    };

    const query = queryString.stringify(searchObj);

    history.push(`/books?${query}`);
  };

  render() {
    const { genres } = this.state;

    const bookList = () => <BookList url={URL} />;
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

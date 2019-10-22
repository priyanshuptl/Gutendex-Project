import React from "react";
import queryString from "query-string";
import { Route, withRouter } from "react-router-dom";
import HomePage from "./components/handler/home-page";
import BookList from "./components/handler/book-list";
import { Genres } from "./components/enums";
import "typeface-roboto";
import "./App.css";

const url = "http://skunkworks.ignitesol.com:8000";

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

    const bookList = () => <BookList url={url} />;
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

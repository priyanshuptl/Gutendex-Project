import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
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
    genres
  };

  render() {
    const { genres } = this.state;

    const bookList = ({ match }) => (
      <BookList genre={match.params.genre} url={url} />
    );
    const homePage = () => <HomePage genres={genres} />;

    return (
      <BrowserRouter>
        <Route exact path="/" component={homePage} />
        <Route path="/books/:genre" component={bookList} />
      </BrowserRouter>
    );
  }
}

export default App;

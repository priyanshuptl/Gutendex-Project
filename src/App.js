import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./components/handler/home-page";
import BookList from "./components/handler/book-list";
import "typeface-roboto";
import "./App.css";

class App extends React.Component {
  state = {};

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route path="/books/:genre" component={BookList} />
      </BrowserRouter>
    );
  }
}

export default App;

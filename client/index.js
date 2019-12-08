import ReactDOM from "react-dom";
import React, { Component } from "react";
import Form from "./components/form";
import Axios from "axios";

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    Axios.get("/whoami").then(response => {
      if (response) {
        this.setState({ loggedIn: true });
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.loggedIn !== this.state.loggedIn) {
      Axios.get("/whoami").then(response => {
        if (response) {
          this.setState({ loggedIn: true });
        }
      });
    }
  }
  render() {
    return (
      <div
        style={
          this.state.loggedIn
            ? { backgroundColor: "tomato" }
            : { backgroundColor: "grey" }
        }
      >
        <Form />
      </div>
    );
  }
}

ReactDOM.render(<MainPage />, document.querySelector("#app"), () => {
  console.log("Application rendered!");
});

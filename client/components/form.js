import React, { Component } from "react";
import Axios from "axios";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signUp = this.signUp.bind(this);
  }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  handleSubmit(ev) {
    ev.preventDefault();
    Axios.post("/login", this.state).then(response => console.log(response));
  }
  signUp() {
    Axios.post("/user", this.state);
  }
  render() {
    return (
      <form>
        <label>Username</label>
        <input name="username" onChange={this.handleChange}></input>
        <label>Password</label>
        <input name="password" onChange={this.handleChange}></input>
        <button onClick={this.handleSubmit}>LOG ME IN!!</button>
        <button onClick={this.signUp}>SIGN ME UP</button>
      </form>
    );
  }
}

export default Form;

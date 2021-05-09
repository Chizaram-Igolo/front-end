import React, { Component } from "react";
import isAuthenticated from "../lib/isAuthenticated";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedin: isAuthenticated(),
    };

    this.submit = this.submit.bind(this);
  }

  componentDidUpdate() {
    if (this.state.loggedin) {
      this.props.history.push("/");
    }
  }

  submit(e) {
    e.preventDefault();
    e.stopPropagation();

    let form = e.target;
    let formData = new FormData(form);
    let params = new URLSearchParams(formData);

    // TODO
    // Validate form inputs.

    // Send request to the server
    fetch("/api/login", {
      method: "POST",
      body: params,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        this.setState({ loggedin: true });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.submit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" pattern=".{2,20}" required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" pattern=".{6,20}" required />
          </div>
          <div>
            <input type="submit" value="Log in" />
          </div>
        </form>
      </div>
    );
  }
}

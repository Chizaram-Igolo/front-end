import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import isAuthenticated from "../lib/isAuthenticated";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedin: isAuthenticated(),
    };

    this.submit = this.submit.bind(this);
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
    fetch("/api/signup", {
      crossDomain: true,
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
    if (this.state.loggedin) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: this.props.location },
          }}
        />
      );
    } else {
      return (
        <div>
          <h1>Sign up</h1>
          <form onSubmit={this.submit}>
            <div>
              <label>Username:</label>
              <input type="text" name="username" pattern=".{2,20}" required />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                pattern=".{6,20}"
                required
              />
            </div>
            <div>
              <input type="submit" value="Sign up" />
            </div>
          </form>
        </div>
      );
    }
  }
}

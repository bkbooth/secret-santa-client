import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  saveToState = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Mutation mutation={LOGIN_MUTATION} variables={this.state}>
        {(login, { error, loading }) => (
          <form
            method="POST"
            onSubmit={async event => {
              event.preventDefault();
              await login();
              this.setState({ email: "", password: "" });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h1>Login</h1>

              <label htmlFor="email">
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>

              <label htmlFor="password">
                Password
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>

              <button type="submit">Login</button>
            </fieldset>
          </form>
        )}
      </Mutation>
    );
  }
}

export default Login;

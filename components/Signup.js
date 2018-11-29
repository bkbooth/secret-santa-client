import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($user: SignupParams!) {
    signup(user: $user) {
      successful
      messages {
        code
        field
        message
        template
        options {
          key
          value
        }
      }
      result {
        id
        name
        email
      }
    }
  }
`;

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    phoneNumber: ""
  };

  saveToState = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={{ user: this.state }}>
        {(signup, { error, loading }) => (
          <form
            method="POST"
            onSubmit={async event => {
              event.preventDefault();
              await signup();
              this.setState({
                name: "",
                email: "",
                password: "",
                phoneNumber: ""
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Signup for an account</h2>

              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.saveToState}
                />
              </label>

              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>

              <label htmlFor="phoneNumber">
                Phone Number
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={this.state.phoneNumber}
                  onChange={this.saveToState}
                />
              </label>

              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>

              <button type="submit">Signup</button>
            </fieldset>
          </form>
        )}
      </Mutation>
    );
  }
}

export default Signup;

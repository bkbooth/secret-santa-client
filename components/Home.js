import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      phone_number
    }
  }
`;

const Home = () => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => {
      if (error)
        return (
          <p>
            <b>Error:</b> {error.message}
          </p>
        );
      if (loading) return <p>Loading...</p>;
      const { users } = data;
      return (
        <div>
          <h1>Users!</h1>
          {users.map(user => (
            <p title={user.id} key={user.id}>
              {user.name} &lt;{user.email}&gt;
            </p>
          ))}
        </div>
      );
    }}
  </Query>
);

export default Home;

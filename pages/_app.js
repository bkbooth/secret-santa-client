import React from "react";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import withApolloClient from "../lib/with-apollo-client";
import Page from "../components/Page";

if (process.browser) {
  import("../lib/emojify-domain").then(({ emojifyDomain }) => emojifyDomain());
}

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { apolloClient, Component, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);

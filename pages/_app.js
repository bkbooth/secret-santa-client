import React from 'react'
import App, { Container } from 'next/app'

if (process.browser) {
  import('../lib/emojifyDomain')
    .then(({ emojifyDomain }) => emojifyDomain())
}

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

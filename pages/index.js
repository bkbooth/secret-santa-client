import React from 'react'
import Head from '../components/Head'
import Home from '../components/Home'

const Index = () => (
  <>
    <Head />
    <Home />

    <style jsx global>{`
      html {
        box-sizing: border-box;
        font-size: 10px;
      }
      *, *:before, *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 1.2rem;
        background: #fff1f1;
      }
    `}</style>
  </>
)

export default Index

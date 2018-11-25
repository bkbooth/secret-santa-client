import React from "react";
import getConfig from "next/config";
import Header from "./Header";
import Meta from "./Meta";

const {
  publicRuntimeConfig: { theme }
} = getConfig();

const Page = props => (
  <>
    <div className="page">
      <Meta />
      <Header />
      <div className="content">{props.children}</div>
    </div>

    <style jsx>{`
      .page {
        display: flex;
        flex-direction: column;
        min-height: 85vh;
      }
      .content {
        flex: 1;
      }
    `}</style>

    <style jsx global>{`
      html {
        box-sizing: border-box;
        font-size: 10px;
      }
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        font-size: 1.2rem;
        background: ${theme.lightRed};
      }
    `}</style>
  </>
);

export default Page;

module.exports = {
  publicRuntimeConfig: {
    emojiDomains: ["🤫🎅.ws", "🤫🎁.ws"],
    punycodeDomains: ["xn--8j8hl4g.ws", "xn--4j8ht4g.ws"],
    standardDomains: ["shhh.gift"],

    apiEndpoint: "http://localhost:4000/api",

    theme: {
      lightRed: "#fff1f1"
    }
  },

  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    return config;
  }
};

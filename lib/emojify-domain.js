import getConfig from "next/config";
const {
  publicRuntimeConfig: { emojiDomains, punycodeDomains, standardDomains }
} = getConfig();

export function emojifyDomain() {
  if (!window) return;
  const wl = window.location;
  if (
    !(
      emojiDomains.includes(wl.hostname) ||
      punycodeDomains.includes(wl.hostname) ||
      standardDomains.includes(wl.hostname)
    )
  )
    return; // if using an unknown domain, assume dev (eg. localhost or IP address)

  // check if browser handles emoji domains
  let useEmojiDomain = /^((?!chrome).)*safari/i.test(navigator.userAgent);
  if (navigator.userAgent.includes("CriOS")) useEmojiDomain = false;

  if (
    (useEmojiDomain &&
      (emojiDomains.includes(wl.hostname) ||
        punycodeDomains.includes(wl.hostname))) ||
    (!useEmojiDomain && standardDomains.includes(wl.hostname))
  )
    return; // current domain is ok

  const newUrl =
    `${wl.protocol}//` +
    (useEmojiDomain ? emojiDomains[0] : standardDomains[0]) +
    (wl.port ? `:${wl.port}` : "") +
    wl.pathname +
    wl.search;
  console.log("Redirecting to", newUrl);
  window.location = newUrl;
}

import { EMOJI_DOMAINS, PUNYCODE_DOMAINS, STANDARD_DOMAINS } from '../config'

export function emojifyDomain(window) {
  if (!window) return
  const wl = window.location
  if (!(
    EMOJI_DOMAINS.includes(wl.hostname) ||
    PUNYCODE_DOMAINS.includes(wl.hostname) ||
    STANDARD_DOMAINS.includes(wl.hostname)
  )) return // if using an unknown domain, assume dev (eg. localhost or IP address)

  // check if browser supports emoji domains
  let useEmojiDomain = /^((?!chrome).)*safari/i.test(navigator.userAgent)
  if (navigator.userAgent.includes('CriOS')) useEmojiDomain = false

  if (
    (useEmojiDomain && (
      EMOJI_DOMAINS.includes(wl.hostname) ||
      PUNYCODE_DOMAINS.includes(wl.hostname)
    )) ||
    (!useEmojiDomain && STANDARD_DOMAINS.includes(wl.hostname))
  ) return // current domain is ok

  const newUrl = `${wl.protocol}//`
    + (useEmojiDomain ? EMOJI_DOMAINS[0] : STANDARD_DOMAINS[0])
    + (wl.port ? `:${wl.port}` : '')
    + wl.pathname
    + wl.search
  console.log('Redirecting to', newUrl)
  window.location = newUrl
}

import { EMOJI_DOMAINS, PUNYCODE_DOMAINS, STANDARD_DOMAINS } from '../config'
console.log({ EMOJI_DOMAINS, PUNYCODE_DOMAINS, STANDARD_DOMAINS })

export function emojifyDomain(window) {
  if (!window) return
  const wl = window.location
  console.log('Checking...')
  if (!(
    EMOJI_DOMAINS.includes(wl.hostname) ||
    PUNYCODE_DOMAINS.includes(wl.hostname) ||
    STANDARD_DOMAINS.includes(wl.hostname)
  )) return // if using an unknown domain, assume dev (eg. localhost or IP address)
  console.log('Continuing...')

  let useEmojiDomain = /^((?!chrome).)*safari/i.test(navigator.userAgent)
  if (navigator.userAgent.includes('CriOS')) useEmojiDomain = false
  console.log('Use emoji domain?', useEmojiDomain)

  console.log('Checking current domain...')
  if (
    (useEmojiDomain && (
      EMOJI_DOMAINS.inclues(wl.hostname) ||
      PUNYCODE_DOMAINS.includes(wl.hostname)
    )) ||
    (!useEmojiDomain && STANDARD_DOMAINS.includes(wl.hostname))
  ) {
    console.log('Exiting...', {
      useEmojiDomain,
      hostname: wl.hostname,
      emoji: EMOJI_DOMAINS.includes(wl.hostname),
      puny: PUNYCODE_DOMAINS.includes(wl.hostname),
      standard: STANDARD_DOMAINS.includes(wl.hostname),
    })
    return // current domain is ok
  }

  console.log('Here...')
  const newUrl = `${wl.protocol}//`
    + (useEmojiDomain ? EMOJI_DOMAINS[0] : STANDARD_DOMAINS[0])
    + (wl.port ? `:${wl.port}` : '')
    + wl.pathname
    + wl.search
  console.log('Redirecting to', newUrl)
  window.location = newUrl
}

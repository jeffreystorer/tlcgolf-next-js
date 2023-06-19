import is from "is_js"

export default function showCopyLineupToClipboard() {
  const ios = is.ios()
  const android = is.android()
  const isIpad =
    /Macintosh/i.test(navigator.userAgent) &&
    navigator.maxTouchPoints &&
    navigator.maxTouchPoints > 1
  let showCopyLineupToClipboard = true
  if (ios || isIpad || android) showCopyLineupToClipboard = false
  return showCopyLineupToClipboard
}

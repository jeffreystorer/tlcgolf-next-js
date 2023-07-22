export default function copyImageToClipboard(element) {
  const selection = window.getSelection()
  const range = document.createRange()
  const img = element.firstChild

  // Preserve alternate text
  const altText = img.alt
  img.setAttribute("alt", img.src)

  range.selectNodeContents(element)
  selection.removeAllRanges()
  selection.addRange(range)

  try {
    // Security exception may be thrown by some browsers.
    return document.execCommand("copy")
  } catch (ex) {
    console.warn("Copy to clipboard failed.", ex)

    return false
  } finally {
    img.setAttribute("alt", altText)
  }
}

export const parseHTML = (html) =>
  document.createRange().createContextualFragment(html).firstElementChild

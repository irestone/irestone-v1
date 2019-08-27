import { parseHTML } from '../utils'

export const nav = async () => {
  return parseHTML(`
    <nav class='nav'>
      <ul class='nav__links'>
        ${link('Settings', '/admin')}
        ${await pages()}
        ${await categories()}
      </ul>
    </nav>
  `)
}

const pages = async () => {
  const data = await fetch(`/api/pages`)
    .then((res) => res.json())
    .then((json) => json.data)

  const links = data.map(({ title, slug }) => [title, `/admin/pages/${slug}`])
  links.push(['+ New', '/admin/pages/new', 'new'])

  return subLinks('Pages', links)
}

const categories = async () => {
  const data = await fetch(`/api/categories`)
    .then((res) => res.json())
    .then((json) => json.data)

  const links = data.map(({ name, slug }) => [
    name,
    `/admin/categories/${slug}`,
  ])
  links.push(['+ New', '/admin/categories/new', 'new'])

  return subLinks('Categories', links)
}

const link = (name, url, type) => `
  <li class='nav__link${type === 'new' ? ' nav__link--new' : ''}'>
    <a href='${url}'>${name}</a>
  </li>
`

const subLinks = (title, links) => `
  <li class='nav__link has-sub-links'>
    <span class='nav__sub-links__title'>${title}</span>
    <ul class='nav__sub-links'>
      ${links.map((data) => link(...data)).join('')}
    </ul>
  </li>
`

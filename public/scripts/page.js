const editor = new SimpleMDE({
  element: document.querySelector('.page__editor'),
})

const form = document.querySelector('.page__form')

form.addEventListener('click', (e) => {
  const action = e.target.dataset.action
  if (!action) return
  e.preventDefault()

  console.log('ACTION', action)

  const data = new FormData(form)
  data.set('content', editor.value())

  switch (action) {
    case 'publish':
      publish(data)
        .then((json) => console.log(json.data))
        .catch((err) => console.error(err))
      break
    case 'save':
      save(data)
        .then((json) => console.log(json.data))
        .catch((err) => console.error(err))
      break
    case 'delete':
      del()
        .then((json) => console.log(json.data))
        .catch((err) => console.error(err))
      break
    default:
      console.error(`Can't handle action "${action}"`)
  }
})

const publish = async (data) => {
  for (let [field, value] of data) {
    if (!value) {
      return console.error(`Value of "${field}" has not been assigned.`)
    }
  }

  const dataJSON = JSON.stringify(Object.fromEntries(data))

  return fetch('/api/pages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: dataJSON,
  }).then((res) => res.json())
}

const save = async (data) => {
  for (let [field, value] of data) {
    if (!value) {
      return console.error(`Value of "${field}" has not been assigned.`)
    }
  }

  const dataJSON = JSON.stringify(Object.fromEntries(data))
  const id = document.querySelector('.page').id

  return fetch(`/api/pages/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: dataJSON,
  }).then((res) => res.json())
}

const del = async () => {
  const id = document.querySelector('.page').id
  return fetch(`/api/pages/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json())
}

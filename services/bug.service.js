const BASE_URL = 'http://localhost:3030/api/bug'

export const bugService = {
  query,
  getById,
  getDefaultFilter,
  remove,
  save,
}
function query(filterBy = {}) {
  const queryParams = new URLSearchParams(filterBy)

  return fetch(`${BASE_URL}?${queryParams}`).then((res) => res.json())
}

function getById(bugId) {
  return fetch(`${BASE_URL}/${bugId}`, {
    credentials: 'include',
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((errMsg) => {
        throw new Error(errMsg)
      })
    }

    return res.json()
  })
}

function getDefaultFilter() {
  return {
    txt: '',
    minSeverity: 0,
    labels: '',
    sortBy: '',
    sortDir: 1,
    pageIdx: 0,
  }
}

function remove(bugId) {
  return fetch(`${BASE_URL}/${bugId}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then((res) => res.json())
}

function save(bug) {
  const method = bug._id ? 'PUT' : 'POST'
  const url = bug._id ? `${BASE_URL}/${bug._id}` : BASE_URL

  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(bug),
  }).then((res) => res.json())
}

const BASE_URL = 'http://localhost:3030/api/bug'

export const bugService = {
  query,
  getById,
  getDefaultFilter,
  remove,
  save,
}
function query(filterBy) {
  return fetch(BASE_URL)
    .then((res) => res.json())
    .then((bugs) => {
      if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        bugs = bugs.filter((bug) => regExp.test(bug.title))
      }

      if (filterBy.minSeverity) {
        bugs = bugs.filter((bug) => bug.severity >= filterBy.minSeverity)
      }

      return bugs
    })
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
  return { txt: '', minSeverity: 0 }
}

function remove(bugId) {
  return fetch(`${BASE_URL}/${bugId}/remove`, {
    credentials: 'include',
  }).then((res) => res.json())
}

function save(bug) {
  const url = `${BASE_URL}/save?_id=${bug._id || ''}&title=${encodeURIComponent(
    bug.title
  )}&description=${encodeURIComponent(bug.description)}&severity=${
    bug.severity
  }`
  return fetch(url).then((res) => res.json())
}

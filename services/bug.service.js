const BASE_URL = 'http://localhost:3030/api/bug'

export const bugService = {
    query,
    getById,
    getDefaultFilter,
    remove,
}
function query() {
    return fetch(BASE_URL)
        .then(res => res.json())
}

function getById(bugId) {
    return fetch(`${BASE_URL}/${bugId}`)
        .then(res => res.json())
}

function getDefaultFilter() {
    return { txt: '', minSeverity: 0 }
}

function remove(bugId) {
    return fetch(`${BASE_URL}/${bugId}/remove`)
        .then(res => res.json())
}
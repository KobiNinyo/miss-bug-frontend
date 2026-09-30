const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }

    setFilterByToEdit((prevFilter) => ({
      ...prevFilter,
      [field]: value,
      pageIdx: 0,
    }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  function onChangePage(diff) {
    setFilterByToEdit((prevFilter) => ({
      ...prevFilter,
      pageIdx: Math.max(0, prevFilter.pageIdx + diff),
    }))
  }

  const { txt, minSeverity, labels, sortBy, sortDir, pageIdx } = filterByToEdit

  return (
    <form className="bug-filter" onSubmit={onSubmitFilter}>
      <p>Filter</p>

      <label htmlFor="txt">Text: </label>
      <input
        value={txt}
        onChange={handleChange}
        type="text"
        placeholder="Search title / desc."
        id="txt"
        name="txt"
      />

      <label htmlFor="minSeverity">Min Severity: </label>
      <input
        value={minSeverity || ''}
        onChange={handleChange}
        type="number"
        placeholder="By Min Severity"
        id="minSeverity"
        name="minSeverity"
      />

      <label htmlFor="labels">Labels: </label>
      <input
        value={labels}
        onChange={handleChange}
        type="text"
        placeholder="critical,need-CR"
        id="labels"
        name="labels"
      />

      <label htmlFor="sortBy">Sort By: </label>
      <select value={sortBy} onChange={handleChange} id="sortBy" name="sortBy">
        <option value="">No sorting</option>
        <option value="title">Title</option>
        <option value="severity">Severity</option>
        <option value="createdAt">Created At</option>
      </select>

      <label htmlFor="sortDir">Direction: </label>
      <select
        value={sortDir}
        onChange={handleChange}
        id="sortDir"
        name="sortDir"
      >
        <option value="1">Ascending</option>
        <option value="-1">Descending</option>
      </select>

      <div className="pagination">
        <button
          type="button"
          disabled={pageIdx === 0}
          onClick={() => onChangePage(-1)}
        >
          Previous
        </button>

        <span>Page {pageIdx + 1}</span>

        <button type="button" onClick={() => onChangePage(1)}>
          Next
        </button>
      </div>
    </form>
  )
}

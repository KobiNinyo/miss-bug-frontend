export function BugPreview({ bug }) {
  return (
    <article className="bug-preview">
      <p className="title">{bug.title}</p>
      <p>
        Severity: <span>{bug.severity}</span>
      </p>

      {bug.labels && bug.labels.length > 0 && (
        <p>
          Labels: <span>{bug.labels.join(', ')}</span>
        </p>
      )}
    </article>
  )
}

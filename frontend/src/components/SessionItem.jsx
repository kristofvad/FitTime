

function SessionItem({session}) {
  return (
    <div className="session">
        <div>
            {new Date(session.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{session.text}</h2>
    </div>
  )
}

export default SessionItem
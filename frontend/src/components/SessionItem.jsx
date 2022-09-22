import {useDispatch} from 'react-redux'
import {deleteSession} from '../features/sessions/sessionSlice'

function SessionItem({session}) {
  const dispatch = useDispatch()
  
  return (
    <div className="session">
        <div>
            {new Date(session.createdAt).toLocaleString('en-US')}
            <h2>{session.text}</h2>
        <button onClick={() => dispatch(deleteSession(session._id))} className="close">X</button>
        </div>
        
    </div>
  )
}

export default SessionItem
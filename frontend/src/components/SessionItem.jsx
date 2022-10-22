import { FaTimes } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import {deleteSession, updateSession} from '../features/sessions/sessionSlice'
import { useState } from 'react';

function SessionItem({session}) {
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(false)
  const [text, setText] = useState(session.text)
  
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updateSession(session._id, {text}))
    setText('')
}
  
  const form = () => {
    setShowForm(!showForm);
    
  }

  return (
    <div className="session">
        <div className='task'>
            <h3>
            {session.text}
            
        <button onClick={form} className="update">
        <FaEdit style={{cursor: 'pointer'}}/>
        </button>
          { showForm &&
          (
            <section className='form'>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
              <label htmlFor='text'>Session</label>
                <input
                  type='text'
                  name='text'
                  id='text'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  
                />
              </div>
              <div className='form-group'>
                <button className='btn btn-block'>
                  Update Session
                </button>
              </div>
            </form>
          </section>
          )}
              <button onClick={() => dispatch(deleteSession(session._id))} className="close">
                <FaTimes style={{color: 'red', cursor: 'pointer',}}/> 
              </button>
            </h3>
        </div>
    </div>
  )
}

export default SessionItem
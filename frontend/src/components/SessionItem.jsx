import { AiFillDelete } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import {deleteSession, updateSession} from '../features/sessions/sessionSlice'
import { useState } from 'react';
import SessionForm from './SessionForm';
import { useCallback } from 'react';

function SessionItem({session}) {
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(true);
  
  const form = () => {
    setShowForm(!showForm);
  }

  const onUpdateSession = useCallback((sessionData) => {
    dispatch(updateSession({
      sessionData,
      id: session._id,
    }));
    setShowForm(false);
  }, [dispatch, session._id]);

  return (
    
    <div className="session">
        <div className="task">
            <div style={{ 'flexGrow': 1 }}>
              <h3>{session.title}</h3>
              <p className={isActive ? 'show-all' : 'show-less'} style={{"overflow": "hidden", "whiteSpace": "no-wrap", "textOverflow": "ellipsis"}}>{session.desc}</p>
            </div>
            <div className='session_actions' style={{"flexShrink": 0}}>
              <button onClick={form} className="btn_edit">
                <FaEdit size={30} style={{cursor: 'pointer'}}/>
              </button>
              { showForm &&
                (
                  <div className="session_update">
                    <div className="form_update">
                      {"Update Session"}
                      <section className='form'>
                        <SessionForm session={session} onSubmit={onUpdateSession} />
                      </section>
                    </div>
                  </div>
                )
              }
              <button onClick={() => dispatch(deleteSession(session._id))} className="btn_delete">
                <AiFillDelete size={30} style={{cursor: 'pointer', }}/> 
              </button>
            </div>
        </div>
    </div>
  )
}

export default SessionItem

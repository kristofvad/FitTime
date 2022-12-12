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
  const [style, setStyle] = useState("session");
  const [subtr, setSubtr] = useState(session.desc?.substring(0,10))
  const [isActive, setIsActive] = useState(true);

  /*const onSubmit = (e) => {
    e.preventDefault();

    const sessionData = {
        title,
        desc,
    }
    dispatch(updateSession(session._id, {sessionData}))
}*/
  
  const form = () => {
    setShowForm(!showForm);
    
  }

  /*const onChange = (e) => {
    setSessionData((prevSate) => ({
        ...prevSate,
        [e.target.name]: e.target.value,

    }))
}*/

  const onUpdateSession = useCallback((updatedSession) => {
    dispatch(updateSession({
      ...updatedSession,
      id: session._id,
    }));
  }, [dispatch, session._id]);

    

    function changeStyle () {
    setStyle("session_expand");
    setSubtr(session.desc.substring(0,250))

    setIsActive(current => !current);
  };

  

  return (
    
    <div className={isActive ? 'session' : 'session_expand'} onClick={changeStyle}>
        <div className='task' >
            <h3>
              {session.title}
              <br />
              {`${subtr}`}
        <div className='session_actions'>
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
          )}
              <button onClick={() => dispatch(deleteSession(session._id))} className="btn_delete">
                <AiFillDelete size={30} style={{cursor: 'pointer', }}/> 
              </button>
              </div>
            </h3>
        </div>
    </div>
  )
}

export default SessionItem

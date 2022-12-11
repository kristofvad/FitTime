import { AiFillDelete } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import {deleteSession, updateSession} from '../features/sessions/sessionSlice'
import { useState } from 'react';

function SessionItem({session}) {
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()
  const [style, setStyle] = useState("session");
  const [subtr, setSubtr] = useState(session.desc?.substring(0,10))
  const [isActive, setIsActive] = useState(true);

    const [sessionData, setSessionData] = useState({
        title: '',
        desc: '',
      })
      
    const {title, desc} = sessionData

  const onSubmit = (e) => {
    e.preventDefault();

    const sessionData = {
        title,
        desc,
    }
    dispatch(updateSession(session._id, {sessionData}))
}
  
  const form = () => {
    setShowForm(!showForm);
    
  }

  const onChange = (e) => {
    setSessionData((prevSate) => ({
        ...prevSate,
        [e.target.name]: e.target.value,

    }))
}

    

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
                <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input
                    type='text'
                    name='title'
                    id='title'
                    value={title}
                    placeholder={session.title}
                    onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <input
                    type='text'
                    name='desc'
                    id='desc'
                    placeholder={session.desc}
                    value={desc}
                    onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-block'>
                    Update Session
                    </button>
                </div>
                </form>
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
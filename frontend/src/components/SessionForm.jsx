import { useCallback } from 'react';
import { useEffect } from 'react';
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createSession} from '../features/sessions/sessionSlice'

function SessionForm({ session, onSubmit }) {

  const [sessionData, setSessionData] = useState(session);

  const {title, desc} = sessionData

  const dispatch = useDispatch()

  const onChange = (e) => {
    setSessionData((prevSate) => ({
        ...prevSate,
        [e.target.name]: e.target.value,

    }))
  }

  useEffect(() => {
    if (sessionData.title === '') {
      
    }
  }, [sessionData.title]);

    /*const onSubmit = (e) => {
        e.preventDefault()

        const sessionData = {
          title,
          desc,
      }
        dispatch(createSession(sessionData))
    }*/

    const submitHandler = useCallback((event) => {
      event.preventDefault();
      onSubmit(sessionData);
    }, [sessionData, onSubmit]);

    return (
      <div className="session_add">
        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='title'>Session Name</label>
              <input
                type='text'
                name='title'
                id='title'
                value={title}
                onChange={onChange}
              />
              <label htmlFor='desc'>Session Description</label>
              <input
                type='text'
                name='desc'
                id='desc'
                value={desc}
                onChange={onChange}
              />
              
            </div>
            <div className='form-group'>
              <button className='btn_add' type='submit'>
                Add Session
              </button>
            </div>
          </form>
        </section>
      </div>
      )
}

export default SessionForm

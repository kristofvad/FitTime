import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createSession} from '../features/sessions/sessionSlice'

function SessionForm() {

  const [sessionData, setSessionData] = useState({
    title: '',
    desc: '',
  })

  const {title, desc} = sessionData

  const dispatch = useDispatch()

  const onChange = (e) => {
    setSessionData((prevSate) => ({
        ...prevSate,
        [e.target.name]: e.target.value,

    }))
}

    const onSubmit = (e) => {
        e.preventDefault()

        const sessionData = {
          title,
          desc,
      }
        dispatch(createSession(sessionData))
    }

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
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createSession} from '../features/sessions/sessionSlice'

function SessionForm() {

    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createSession({text}))
        setText('')
    }

    return (
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
              <button className='btn btn-block' type='submit'>
                Add Session
              </button>
            </div>
          </form>
        </section>
      )
}

export default SessionForm
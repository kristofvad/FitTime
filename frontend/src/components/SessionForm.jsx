import { useCallback, useState } from 'react';

function SessionForm({ session, onSubmit }) {

  const [sessionData, setSessionData] = useState(session);

  const onChange = useCallback((e) => {
    setSessionData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const submitHandler = useCallback((event) => {
    event.preventDefault();
    onSubmit(sessionData);
  }, [sessionData, onSubmit]);

  return (
    <div className="session_add">
      <section className='form'>
        <form onSubmit={submitHandler}>
          <div className='form-group'>
            <label htmlFor='title'>Session Name</label>
            <input
              type='text'
              name='title'
              id='title'
              value={sessionData.title}
              onChange={onChange}
            />
            <label htmlFor='desc'>Session Description</label>
            <input
              type='text'
              name='desc'
              id='desc'
              value={sessionData.desc}
              onChange={onChange}
            />
            
          </div>
          <div className='form-group'>
            <button className='btn_add' type='submit'>
              {session._id ? 'Update session' : 'Add session'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default SessionForm

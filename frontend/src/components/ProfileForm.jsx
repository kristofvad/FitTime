import { useCallback, useState } from 'react';

function SessionForm({ user, onSubmit }) {

  const [userData, setUserData] = useState(user);

  const onChange = useCallback((e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const submitHandler = useCallback((event) => {
    event.preventDefault();
    onSubmit(userData);
  }, [userData, onSubmit]);

  return (
    <div className="session_add">
      <section className='form'>
        <form onSubmit={submitHandler}>
          <div className='form-group'>
            <label htmlFor='name'>User Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={userData.name}
              onChange={onChange}
            />
            <label htmlFor='email'>User E-mail</label>
            <input
              type='text'
              name='email'
              id='email'
              value={userData.email}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button className='btn_add' type='submit'>
              {user._id ? 'Update user' : 'Add user'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default SessionForm
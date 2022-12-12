import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

export const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const submitHandler = useCallback((event) => {
    event.preventDefault();
    onSubmit(formData);
  }, [onSubmit, formData]);

  const onChange = useCallback((e) => {
    setFormData(
      (prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      })
    );
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <input
        type='email'
        className='form-control'
        id='email'
        name='email'
        value={formData.email}
        placeholder='Enter your email'
        onChange={onChange}
      />

      <div className="user-box">
        <input
          type='password'
          className='form-control'
          id='password'
          name='password'
          value={formData.password}
          placeholder='Enter password'
          onChange={onChange}
        />
      </div>

      <div className='button-form'>
        <button type='submit' id="submit">Submit</button>

        <div id="register">
          Dont have an account ?
          <Link to='/register'>Register</Link>
        </div>
      </div>
    </form>
  );
};
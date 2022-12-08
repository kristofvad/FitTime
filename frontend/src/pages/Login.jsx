import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  const AutoplaySlider = withAutoplay(AwesomeSlider);

  return (
    <>
   
      <div className="back">
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={8000}
          organicArrows={false}
          bullets={false}
          fillParent={true}
        >
          <div data-src="/pic_1.jpg" />
          <div data-src="/pic_2.jpg" />
          <div data-src="/pic_3.jpg" />
          <div data-src="/pic_4.jpg" />
          <div data-src="/pic_5.jpg" />
          <div data-src="/pic_6.jpg" />
        </AutoplaySlider>
      </div>
      <div className="front">
        <div className="auth-box">
          <h2>Login</h2>

          <section className="user-box">
            <form onSubmit={onSubmit}>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={email}
                  placeholder='Enter your email'
                  onChange={onChange}
                />
              <div className="user-box">
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Enter password'
                  onChange={onChange}
                />
              </div>

              <div className='button-form'>
              <button type='submit' id="submit">
                  Submit
                </button>

              <div id="register">
                Dont have an account ?
                  <Link to='/register'>
                    Register
                  </Link>
                
              </div>
                </div>
            </form>
          </section>
        </div>
    </div>
  </>
   )
}

export default Login
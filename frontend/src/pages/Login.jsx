import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { LoginForm } from '../components/LoginForm'

function Login() {
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

  const submitLogin = useCallback((userData) => {
    dispatch(login(userData))
  }, [dispatch]);

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
          interval={5000}
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
            <LoginForm onSubmit={submitLogin} />
          </section>
        </div>
    </div>
  </>
   )
}

export default Login
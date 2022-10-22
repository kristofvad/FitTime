import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name,email,password,password2} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth
    ) 

    useEffect (() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch] )

    const onChange = (e) => {
        setFormData((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value,

        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        //Checking if passwords match
        if(password !== password2){
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
            }
            dispatch(register(userData))
        }
    }

    if(isLoading) {
        return <Spinner />
    }

  return <>
  <div className="auth-box">
    <h2>
        Register
    </h2>
  

    <form onSubmit={onSubmit}>
        <div className="user-box">
            <input 
            type='text'
            className='form-control' 
            id='name' 
            name='name' 
            value={name} 
            placeholder='Enter your name' 
            onChange={onChange}
            />
        </div>
        <div className="user-box">
            <input 
            type='email'
            className='form-control' 
            id='email' 
            name='email' 
            value={email} 
            placeholder='Enter your email' 
            onChange={onChange}
            />
        </div>
        <div className="user-box">
            <input 
            type='password'
            className='form-control' 
            id='password' 
            name='password' 
            value={password} 
            placeholder='Enter your password' 
            onChange={onChange}
            />
        </div>
        <div className="user-box">
        <input 
            type='password'
            className='form-control' 
            id='password2' 
            name='password2' 
            value={password2} 
            placeholder='Confirm password' 
            onChange={onChange}
            />
        </div>
        <div className="user-box">
            <button type="submit" id="submit" >Submit</button>
            
            <div id="register">
            
            Already have an account?
              <Link to='/login'>
                Login
              </Link>
              </div>
        </div>
    </form>
  
  </div>
  </>
}

export default Register
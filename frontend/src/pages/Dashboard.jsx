import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SessionForm from '../components/SessionForm'
import SessionItem from '../components/SessionItem'
import Spinner from '../components/Spinner'
import { getSessions, reset } from '../features/sessions/sessionSlice'
import { logout } from '../features/auth/authSlice'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showForm, setShowForm] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { sessions, isLoading, isError, message } = useSelector(
    (state) => state.sessions
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    
    if (!user) {
      navigate('/login')
      dispatch(logout())
    } else {
      dispatch(getSessions())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const form = () => {
    setShowForm(!showForm);
  }

  return (
    <>
      <div className="body">
        <section className='heading'>
          <h1 style={{color: 'white'}}>Welcome {user && user.name}</h1>
          <p>Sessions Dashboard</p>
        </section>

        <button onClick={form} className='btn_add' > Add </button>
       <div>
        { showForm &&
            (<SessionForm />)}
        </div>

        <section className='content'>
          {sessions.length > 0 ? (
            <div className='sessions'>
            {sessions.map ((session) => (
                <SessionItem key={session._id} session={session} />
            ))}
              
            </div>
          ) : (
            <h3>You have not set any sessions</h3>
          )}
        </section>
        
        </div>
    </>
  )
}

export default Dashboard
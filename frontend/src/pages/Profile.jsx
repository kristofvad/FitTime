import React from 'react'
import { useSelector} from 'react-redux'
import moment from 'moment'
import { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import ProfileForm from '../components/ProfileForm'
import Spinner from '../components/Spinner'
import { updateUser } from '../features/user/userSlice'
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom'


function Profile() {

    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const dispatch = useDispatch()
  
    const { users, isLoading, isError, message } = useSelector(
        (state) => state.auth
      )

    useEffect(() => {
    if (isError) {
        console.log(message)
    }
    }, [isError, message])

    const { user } = useSelector((state) => state.auth)

    const form = () => {
        setShowForm(!showForm);
    }

    const onUpdateUser = useCallback((userData) => {
        dispatch(updateUser({
          userData,
          id: user._id,
        }));
        setShowForm(false);
        dispatch(logout());
        navigate('/login');
      }, [dispatch, user._id, navigate]);

    if (isLoading) {
        return <Spinner />
      }
    
  return (
    
    <div className="prof-box">
            <h2>
                Profile
            </h2>
        <div>
            <div className="user-box">
                <h1>
                    User Name:
                </h1>
                <p>{ user.name}</p>
            </div>
            <div className="user-box">
                <br/>
                <h1>
                    User E-mail:
                </h1>
                <p>{user.email}</p>
            </div>
            <div className="user-box">
                <br/>
                <h1>
                    Joined:
                </h1>
                {moment(user.createdAt).format('MMMM-YYYY')}
            </div>
            <button onClick={form} className='btn_add' > Change </button>
                <div>
                    { showForm &&
                        (<ProfileForm user={user} onSubmit={onUpdateUser}/>)
                    }
                </div>
        </div>
    </div>
  )
}

export default Profile
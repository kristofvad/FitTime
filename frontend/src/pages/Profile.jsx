import React from 'react'


function Profile({user}) {
  
  return (
    <div className="front">
    <div className="auth-box">
            <h2>
                Register
            </h2>
        <form onSubmit={onSubmit}>
            <div className="profile-box">
                <cont></cont>
            </div>
            <div className="profile-box">
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
            <div className="profile-box">
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
            <div className="profile-box">
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
            <div className="profile-box">
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
</div>
  )
}

export default Profile
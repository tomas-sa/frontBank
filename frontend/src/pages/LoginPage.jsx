import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import '../styles/loginStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function LoginPage() {

  let {loginUser, loadingIcon} = useContext(AuthContext)
  
  return (
    <div className='loginMain'>
      <div className="titleBox">
        <h1 className='titleLogin'>BANKAPP</h1>
      </div>
        <div className="loginBox">
        <img className='imgLogin' src="Currency_Flatline.png" alt="" />
        <form className='form' onSubmit={loginUser}>
            <input className='inputLogin' type="text" name='username' placeholder='Enter Username' />
            <input className='inputLogin' type="password" name='password' placeholder='Enter Password' />
            {loadingIcon ? 
            <button className='sendInput'>
                <FontAwesomeIcon className='rotate-icon' icon="fa-solid fa-spinner" />
            </button> :
            <button className='sendInput'>Log in</button>}
            <div className="btnLoginBox">
              <Link to='/signup'>
                <button className='signupBtn'>Sign up</button>
              </Link>
            </div>
            
        </form>
        
        </div>
    </div>
  )
}

export default LoginPage
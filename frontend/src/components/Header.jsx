import React from 'react'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import '../styles/headerStyle.css'

function Header() {
  let {user, logoutUser, toggleMenu, menuVisible, Cbu} = useContext(AuthContext)
 

  

  return (
    user &&
    <div className={`header ${menuVisible ? 'visible' : 'oculto'}`}>
      <i onClick={toggleMenu} className="fa-solid fa-x"></i>
      <div className="menuHeader">
        <div className="menuHeaderFirst">
          {user && <p>HELLO <b>{user.username}</b></p>}
        {(Cbu && user ) && <p>CBU: {Cbu}</p>}
        </div>
        <div className="menuHeaderSecond">
          <Link onClick={toggleMenu} className='link linkHome' to='/home'>Home</Link>
        {user ? (
          <p className='logoutBtn' onClick={logoutUser}>Logout</p>):(
          <Link className='link' to='/login'>Login</Link>
        )}
        </div>
      </div>
    </div>
  )
}

export default Header
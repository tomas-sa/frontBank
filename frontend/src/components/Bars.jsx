import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import '../styles/barsStyle.css'

function Bars() {

    const {toggleMenu, user} = useContext(AuthContext)

  return (
    user &&
    <div className='barBox'>
        <i onClick={toggleMenu} className="fa-solid fa-bars-staggered"></i>
    </div>
  )
}

export default Bars
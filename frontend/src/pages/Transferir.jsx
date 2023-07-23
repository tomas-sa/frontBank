import React from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import '../styles/transferirStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Transferir() {
    const {checkUserTransfer, userATransferir,setUserATransferir, transferir, loadingIcon} = useContext(AuthContext)


    const handleHomeClick = () => {
    setUserATransferir('')
  }

  return (
    <div className='transMainBox'>
        <div className="imgTransBox">
            <img className='imgTrans' src="Moneytransfer_Flatline.png" alt="" />
        </div>
        {userATransferir ? (
            <div className="transferirBox">
                <div className="transferirBoxInside">
                    <p className='texto'>transferir a {userATransferir}</p>
                    <form className='formTransferir' onSubmit={transferir}>
                        <input required className='inputTransferir' type="number" placeholder='$0' name='monto' />
                        {loadingIcon ? 
                        <FontAwesomeIcon className='rotate-icon' icon="fa-solid fa-spinner" />:
                        <button className='submitTransferir'>Enviar</button>}
                        
                    </form>
                    <Link  className='link' to='/home'>
                        <button className='homeBtn' onClick={handleHomeClick}>Home</button>
                    </Link>
                </div>
            </div>
        ):(
            <div className='formTransBox'>
                <form className='formTransferir' onSubmit={checkUserTransfer}>
                    <input required className='cbu' placeholder='CBU' type="text" name='cbu' />
                    <select className='dropdown' name="moneda" id="selected_moneda">
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="ARS">ARS</option>
                    </select>
                    {loadingIcon ? 
                        <FontAwesomeIcon className='rotate-icon' icon="fa-solid fa-spinner" />:
                        <button className='submitTransferir'>Enviar</button>}
                </form>
                <div className="cancelBox">
                    <Link onClick={handleHomeClick} className='link' to='/home'>
                        <button className='cancelBtn' >Cancelar</button>
                    </Link>
                </div>
                
            </div>
        )
        
        }
        
    </div>
  )
}

export default Transferir
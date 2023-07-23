import React from 'react'
import '../styles/nuevaCuenta.css'
import { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import toast, { Toaster} from 'react-hot-toast';

function CajaAhorros() {

    const [moneda, setMoneda] = useState('')
    let {authTokens} = useContext(AuthContext)

    const navigate = useNavigate()
    const notifyError = () => toast.error('Ya tienes una cuenta en esa moneda');
    const notifySuccess = () => toast.success('Cuenta creada con éxito');

    const handleMonedaChange = (e) => {
    setMoneda(e.target.textContent);
  }

  let createAccount = async () => {
    let response = await fetch('https://drfbank.onrender.com/cuentas/ahorros/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body:JSON.stringify({'moneda':moneda})
    })
    let data = await response.json()
    if(data.error){
        notifyError()
    }else{
        notifySuccess()
        navigate('/home')
    }
    
  }
  


  return (
    <div className='mainContainer'>
        <img className='money_jar' src="Money jar_Flatline.png" alt="" />
       
        <div className="todoBox">
             <p className='titleNuevaCaja'>Select new account currency</p>
             <div className="monedaBox">
            <div className={`btn usd ${moneda == 'USD' && 'selected'}`} onClick={handleMonedaChange}>
                <p className='cur'>USD</p>
            </div>
            <div className={`btn eur ${moneda == 'EUR' && 'selected'}`} onClick={handleMonedaChange}>
                <p className='cur'>EUR</p>
            </div>
            <div className={`btn ars ${moneda == 'ARS' && 'selected'}`} onClick={handleMonedaChange}>
                <p className='cur'>ARS</p>
            </div>
        </div>
        <div className="sendBox">
            <button onClick={createAccount} className='send'>Submit</button>
        </div>
        </div>
    </div>)}

export default CajaAhorros
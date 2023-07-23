import React from 'react'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import toast, { Toaster} from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/prestamosStyle.css'

function Prestamos() {

  let {authTokens, loadingIcon, setLoadingIcon} = useContext(AuthContext)
  const [prestamos, setPrestamos] = useState([])
  const [seleccionado, setSeleccionado] = useState([])
  const [monedas, setMonedas] = useState([])
  const navigate = useNavigate()

  const notifyError = () => toast.error('no puedes pedir esa cantidad');
  const notifySuccess = () => toast.success('prestamo concedido');

  useEffect(()=>{
    getPrestamos()
  },[])

  function cambiarMoneda(e){
    const filtrado = prestamos.filter(obj =>{
      return obj.moneda === e.target.textContent
    })
    if(filtrado.length > 0){
      setSeleccionado(filtrado[0])
    }
  }
  function cambiarMonedaHandler(e){
    cambiarMoneda(e)
  }

  let postPrestamos = async (e) => {
    e.preventDefault()
    setLoadingIcon(true)

    let response = await fetch('https://drfbank.onrender.com/cuentas/prestamos/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body:JSON.stringify({'monto':parseInt(e.target.monto.value), 'moneda':seleccionado.moneda})
    })
    let data = await response.json()
    if(response.status == 405){
      setLoadingIcon(false)
      notifyError()
    }else{
      setLoadingIcon(false)
      notifySuccess()
      navigate('/home')
    }
    
  }

  let getPrestamos = async () =>{
    let response = await fetch('https://drfbank.onrender.com/cuentas/prestamos/',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    setPrestamos(data)
    data.map( x =>{
      if(!monedas.includes(x.moneda)){
        monedas.push(x.moneda)
      }
    })
    setSeleccionado(data[0])
  }

  return (
    <div className='prestamoBox'>
      <div className="assetsBox">
        <h3 className='loanTitle'>Available loan</h3>
        <p className='infoLoan'>You can get up to $ 10.000 <br /> in each currency to test the app</p>
        <img className='imgNotes' src="Bank note_Outline.png" alt="" />
      </div>
      <div className="prestamoBoxInter">
        <div className="opcionesPrestamo">
        {seleccionado && <p>Currency: <b>{seleccionado.moneda}</b></p>}
      {seleccionado && <p className='disponiblePrestamo'>$ {seleccionado.prestamo}</p>}
      <div className="selectCurr">
        {monedas.length > 0 && monedas.map(x =>(
          <p key={x} onClick={cambiarMonedaHandler} name={x}>{x}</p>
        ))}
      </div>
      </div>
      <form className='formPrestamo' onSubmit={postPrestamos}>
        <input required className='input inputPrestamo' type="number" placeholder='$0' name='monto'/>
        {loadingIcon ? <FontAwesomeIcon className='rotate-icon' icon="fa-solid fa-spinner" />:
        <button className='submitPrestamo'>Submit</button>}
      </form>
      </div>
    </div>
  )
}

export default Prestamos
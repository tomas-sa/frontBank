import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import '../styles/homeStyle.css'
import moment from 'moment'

function Transactions() {
    
    let {transactions, setTransactions, authTokens, user} = useContext(AuthContext)

    useEffect(() => {
    getTransactions()
  }, [])

    let getTransactions = async () => {
    let response = await fetch('https://drfbank.onrender.com/cuentas/transferencia/',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()

    if(response.status === 200){
      setTransactions(data)
      
    }else if(response.statusText ==='Unauthorized'){
      logoutUser()
    }
  }
  const fechaFormater = (fecha) => {
  const fechaISO = fecha;
  const fechaFormateada = moment(fechaISO).format('DD/MM/YY');

  return <p>{fechaFormateada}</p>;
};

  return (
    <div>
        <div className="backBox">
          {transactions.length > 0 && <h2 className='transText'>TRANSACTIONS</h2>}
        {transactions.length  > 0 ? transactions.map( trans => (
          
          <div key={trans.id} className="transferBox">
            {trans.recibio === user.username ? <i className="flecha fa-solid fa-arrow-down"></i> : <i className="flecha fa-solid fa-arrow-up"></i>}
            
            <div className="infoBox">
              {trans.envio == user.username ? (
                <>
                  <p>{trans.recibio}</p>
                  <p className='trans'>Transferencia enviada</p>
                </>
              ) : (
                <>
                  <p>{trans.envio}</p>
                  <p className='trans'>Transferencia recibida</p>
                </>
              )}
            </div>
            <div className="datosBox">
              <div className="moneyBox">
              <p>$ {trans.cantidad}</p>
              <p>{trans.moneda}</p>
            </div >
            <div className='trans'>{fechaFormater(trans.fecha)}</div>
            </div>
          </div>
        )):
        <h2 className='transText'>Your transactions <br /> will be here!</h2>
        }
      </div>
    </div>
  )
}

export default Transactions
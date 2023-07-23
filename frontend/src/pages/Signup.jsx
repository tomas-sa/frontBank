import React from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import toast, { Toaster} from 'react-hot-toast';
import '../styles/signupStyle.css'


function Signup() {

  const notifyError = () => toast.error('algo salio mal');
  const notifySuccess = () => toast.success('cuenta creada con exito');
  const navigate = useNavigate()

  let crearCuenta = async (e) => {
    e.preventDefault()

    let response = await fetch('https://drfbank.onrender.com/cuentas/createuser/', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({'username':e.target.username.value,
       'first_name':e.target.first_name.value,
       'last_name':e.target.last_name.value,
       'email':e.target.email.value,
       'password':e.target.password.value,
       'moneda':e.target.currency.value
      })
    })
    let data = await response.json()
    if(data.error){
            notifyError()
    }else{
            notifySuccess()
            navigate('/login')
        }
  }


  return (
    <div>
        <h3 className='signupTitle'>Create account</h3>
        <form className='signupForm' onSubmit={crearCuenta}>
            <input required name='first_name' type="text" placeholder='Name' />
            <input required name='username' type="text" placeholder='username' />
            <input required name='last_name' type="text" placeholder='Last name' />
            <input required name='email' type="text" placeholder='Email' />
            <input required name='password' type="text" placeholder='Password' />
            <select required name="currency" id="selected_currency">
                <option value="">-select currency-</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="ARS">ARS</option>
            </select>
            <input className='enviarSignup' type="submit"/>
        </form>
        <div className="btnContainer">
          <Link to='/login'> <button className='cancelBtn'>Cancel</button> </Link>
        </div>
    </div>
  )
}

export default Signup
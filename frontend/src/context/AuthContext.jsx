import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import toast, { Toaster} from 'react-hot-toast';

const AuthContext = createContext()

export default AuthContext


export const AuthProvider = ({children}) => {

    
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    let [userATransferir, setUserATransferir] = useState('')
    let [idATransferir, setidATransferir] = useState('')
    let [monedaATransferir, setMonedaATransferir] = useState('')
    let [Cbu, setCbu] = useState('')
    let [transactions, setTransactions ] = useState([])

    const notifyError = () => toast.error('No tienes saldo suficiente');
    const notifyErrorTransferencia = () => toast.error('Cuenta inexistente');
    const notifyErrorLogin = () => toast.error('Invalid user or password');
    const notifySuccess = () => toast.success('Transferencia exitosa');

     const [menuVisible, setMenuVisible] = useState(false);
     const [loadingIcon, setLoadingIcon] = useState(false)

    const navigate = useNavigate()

    let checkUserTransfer = async (e) => {
        e.preventDefault()
        setLoadingIcon(true)

        let response = await fetch('https://drfbank.onrender.com/cuentas/getcuenta/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'id':e.target.cbu.value, 'moneda':e.target.moneda.value})
        })

        let data = await response.json()
        if(response.status === 200){
            setUserATransferir(data[0].nombre)
            setidATransferir(data[0].user)
            setMonedaATransferir(e.target.moneda.value)
            setLoadingIcon(false)
        }else{
            setLoadingIcon(false)
            notifyErrorTransferencia()
            
        }
        
    }

    let transferir = async (e) => {
        e.preventDefault()
        setLoadingIcon(true)

        let response = await fetch('https://drfbank.onrender.com/cuentas/transferencia/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body:JSON.stringify({'usuario_destino_id':idATransferir,"cantidad":parseInt(e.target.monto.value), 'moneda':monedaATransferir})
        })
        
        let data = await response.json()
        if(data.error){
            setLoadingIcon(false)
            notifyError()
        }else{
            setLoadingIcon(false)
            setUserATransferir('')
            notifySuccess()
            navigate('/home')
        }
        
        
    }

    let loginUser = async (e) => {
        e.preventDefault()
        setLoadingIcon(true)
        let response = await fetch('https://drfbank.onrender.com/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })

        let data = await response.json()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/home')
            setLoadingIcon(false)
        }else{
            notifyErrorLogin()
            setLoadingIcon(false)
        }
    }


    let logoutUser = () =>{
        setMenuVisible(false)
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }


    let updateToken = async () => {
        console.log('updated');
        let response = await fetch('https://drfbank.onrender.com/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    

    const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


    let contextData = {
        loginUser:loginUser,
        user:user,
        logoutUser:logoutUser,
        authTokens:authTokens,
        toggleMenu:toggleMenu,
        menuVisible:menuVisible,
        checkUserTransfer:checkUserTransfer,
        userATransferir:userATransferir,
        setUserATransferir:setUserATransferir,
        transferir:transferir,
        setCbu:setCbu,
        Cbu:Cbu,
        loadingIcon:loadingIcon,
        setLoadingIcon:setLoadingIcon,
        transactions:transactions,
        setTransactions:setTransactions

    }

    


    useEffect(() => {

        if(loading){
            updateToken()
        }

        let interval = setInterval(() =>{
            if(authTokens){
                updateToken()
            }
        }, 1000*60*4)
        return () => clearInterval(interval)

    },[authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
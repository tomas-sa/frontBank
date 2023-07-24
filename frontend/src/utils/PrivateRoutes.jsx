import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


function PrivateRoutes(){
    let {user} = useContext(AuthContext)
    

    return(
    user ? <Outlet/> : <Navigate to={'/login'} replace state={{from:location}}/>
    )
}

export default PrivateRoutes
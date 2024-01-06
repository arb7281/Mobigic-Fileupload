import React from 'react'
import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

function PrivateRoute({children}) {
    const userData = useSelector((state) => state.auth)
    if(userData){
        return children;
    }
    else{
       return <Navigate to="/login"/>
    }

}

export default PrivateRoute
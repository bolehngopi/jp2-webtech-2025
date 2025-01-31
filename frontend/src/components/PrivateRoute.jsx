import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Outlet, useNavigate } from 'react-router';

const PrivateRoute = ({ isPrivate }) => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    if (isPrivate) {
        if (!auth) {
            navigate('/login');
        }
    } else {
        if (auth) {
            navigate('/')
        }
    }

    isPrivate ? auth ? <Outlet /> :  : !auth ? <Outlet /> : return;
}

export default PrivateRoute

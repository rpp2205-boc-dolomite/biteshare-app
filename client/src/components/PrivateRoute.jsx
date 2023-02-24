import LogRocket from 'logrocket';
import React from 'react';
import { getSession } from '../helpers/cookie.js';
import { Navigate, Outlet } from 'react-router-dom';
export default function PrivateRoute() {

  const user = getSession();

  if (!user) {
    LogRocket.identify(user.user_id, {
      name: user.name
    });
    return <Navigate to='/login' replace />
  } else {
    return <Outlet context={{user}}/>
  }
}


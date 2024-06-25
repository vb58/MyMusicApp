import React from 'react';
import { Navigate } from 'react-router-dom';
import Spotify from '../components/Spotify';

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{errorMsg:"Please Login with correct credentials!"}}/>;
  }
return <Spotify/>
};

export default ProtectedRoute;
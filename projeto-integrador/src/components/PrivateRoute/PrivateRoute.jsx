import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../provider/auth';

export const PrivateRoute = ({ component: Component, isAdminRoute = false }) => {
  const { getUserByToken, isAdmin } = useContext(AuthContext);
  
  if (getUserByToken) {
    if (isAdminRoute){
      return isAdmin ? <Component /> : <Navigate to="/home/" />;
    }
    else{
      return <Component />;
    }
  } else {
    return <Navigate to="/home/login" />;
  }
}


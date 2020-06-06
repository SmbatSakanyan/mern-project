import React from 'react';
import {useRouts} from "./routs";
import {BrowserRouter as Router} from"react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {NavBar} from "./components/navbar.js";



function App() {
    const {token,userId,login,logout}=useAuth();
    const isAuthenticated = !!token;
    const routes = useRouts(isAuthenticated);

  return (
      <AuthContext.Provider value={{token,userId,login,logout,isAuthenticated}}>

          <Router>
              {isAuthenticated && <NavBar/>}
              {routes}
          </Router>
      </AuthContext.Provider>
  );
}

export default App;

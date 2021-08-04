import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import './App.css';
import Home from './Home';
import Loginsuccess from './Loginsuccess';
import PrivateContent from './PrivateContent';

export const userContext = React.createContext();
export const setUserContext = React.createContext();
export const setUserLoadingContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const checkLoggedIn = () => {
    axios
      .get('http://localhost:8000/checkLoggedIn', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setUserLoading(false);
      })
      .catch((err) => {
        setUserLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    checkLoggedIn();

    console.log('main effect');
  }, []);
  return (
    <>
      <userContext.Provider value={user}>
        <setUserContext.Provider value={setUser}>
          <setUserLoadingContext.Provider value={userLoading}>
            <div className="App">
              <Switch>
                <Route exact={true} path="/" component={Home} />
                <Route
                  exact={true}
                  path="/loginsuccess"
                  component={Loginsuccess}
                />
                <Route
                  exact={true}
                  path="/private"
                  component={PrivateContent}
                />
              </Switch>
            </div>
          </setUserLoadingContext.Provider>
        </setUserContext.Provider>
      </userContext.Provider>
    </>
  );
}

export default App;

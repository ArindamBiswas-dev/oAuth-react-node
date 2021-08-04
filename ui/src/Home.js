import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setUserContext } from './App';

function Home() {
  const setUser = useContext(setUserContext);

  const fetchUser = async () => {
    const user = await axios.get('http://localhost:8000/checkvaliduser', {
      withCredentials: true,
    });
    console.log(user.data);
    return user.data;
  };

  const logIn = async () => {
    let timer = null;
    const logInUrl = 'http://localhost:8000/login/github2';
    const newWindow = window.open(
      logInUrl,
      '_blank',
      'width=500px,height=500px'
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          // check the user is valid
          const user = fetchUser();
          setUser(user);
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  const logOut = () => {
    axios
      .get('http://localhost:8000/logout', { withCredentials: true })
      .then((res) => {
        setUser(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>This is the home page</h1>
      <button onClick={() => logIn()}>Log in with Github</button>
      <button onClick={() => logOut()}>Log Out</button>
      <Link to="/private">PrivateContent</Link>
    </div>
  );
}

export default Home;

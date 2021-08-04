import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setUserLoadingContext, userContext } from './App';

function PrivateContent() {
  const user = useContext(userContext);
  const userLoading = useContext(setUserLoadingContext);
  console.log(userLoading);
  if (!user && !userLoading) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div>
        <h1>This is the private content</h1>
        <img src="" alt="user_avater" />
        <Link to="/">Home</Link>
      </div>
    </>
  );
}

export default PrivateContent;

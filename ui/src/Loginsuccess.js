import React, { useEffect } from 'react';

function Loginsuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  });
  return <div>Log In Successful :D</div>;
}

export default Loginsuccess;

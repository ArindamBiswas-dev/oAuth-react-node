import axios from 'axios';
import React, { useEffect } from 'react';

function LGC() {
  useEffect(() => {
    axios
      .get('http://localhost:8000/login/github')
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);
  return <div></div>;
}

export default LGC;

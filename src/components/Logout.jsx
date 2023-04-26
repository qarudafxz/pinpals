import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png';
import TopLoadingBar from 'react-top-loading-bar';

function Navbar() {
  const navigate = useNavigate();
  const [ progress, setProgress ] = useState(0);

  const handleClick = () => {
    setProgress(30);
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    setTimeout(() => {
      setProgress(100);
      navigate('/');
    },1500)
  }

  return (
    <div className="flex flex-row justify-between items-center">
      <TopLoadingBar
        color="#0085FF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={6}
      />
      <Link to={'/pins/all'}><img src={Logo} alt="Pinpal" className="h-8"/></Link>
      <button className="font-body text-white bg-blue font-semibold py-2 px-4 rounded-md" onClick={handleClick}>Log out</button>
    </div>
  )
}

export default Navbar
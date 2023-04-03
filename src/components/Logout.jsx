import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png';

function Navbar() {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    navigate('/');
  }

  return (
    <div className="flex flex-row justify-between items-center">
      <Link to={'/pins/all'}><img src={Logo} alt="Pinpal" className="h-8"/></Link>
      <button className="font-body text-white bg-blue font-semibold py-2 px-4 rounded-md" onClick={handleClick}>Log out</button>
    </div>
  )
}

export default Navbar
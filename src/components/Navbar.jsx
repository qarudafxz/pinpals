import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';

import MenuMobile from './MenuMobile';

function Navbar() {
  const [ isClicked, setIsClicked ] = useState(false);

  return (
    <div className="flex flex-row justify-between items-center">
      <Link to={'/'}><img src={Logo} alt="Pinpal" className="h-8 xl:h-12"/></Link>
      <GiHamburgerMenu className="text-2xl text-lg cursor-pointer xsm: text-3xl lg:hidden" onClick={() => setIsClicked(!isClicked)}/>
      <div className="xxxsm:hidden xxsm:hidden xsm: hidden lg:flex flex-row gap-6 items-center relative z-10">
      <Link to={'/auth/login'}><button className="font-body text-white font-semibold cursor-pointer">Log In</button></Link>
        <button className="bg-blue px-4 py-2 rounded-md text-white font-medium cursor-pointer hover:bg-[#0067c7]"><Link to={'/auth/signup'}>Get Started</Link></button>
      </div>
      <MenuMobile isClicked={isClicked}/>
    </div>
  )
}

export default Navbar
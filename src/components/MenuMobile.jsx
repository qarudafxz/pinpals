import React from 'react'
import { Link } from 'react-router-dom';
import { IoMdLogIn } from 'react-icons/io'
import { BiUserCircle } from 'react-icons/bi';

const MenuMobile = ({isClicked}) => {
  return (
    <div className="absolute right-5 top-16">
      {
        isClicked && (
          <div className="bg-secondary h-auto rounded-md border-2 border-[#3A3A3A] p-4 flex flex-col gap-6 md:mt-10">
            <div className="flex flex-row gap-5 items-center">
              <IoMdLogIn className="text-white text-xl"/>
              <Link to="/auth/login" className="text-white text-base font-body font-regular">Login</Link>
            </div>
            <div className="flex flex-row gap-5 items-center">
              <BiUserCircle className="text-white text-xl"/>
              <Link to="/auth/signup" className="text-white text-base font-body font-regular">Sign up</Link>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default MenuMobile
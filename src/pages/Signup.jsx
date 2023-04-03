import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Bg from '../assets/bg_2.png';
import { IoEyeSharp } from 'react-icons/io5';

import { buildUrl } from '../utils/buildUrl';

import { useSetUserId } from '../hooks/useSetUserId';

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ isVisible, setIsVisible ] = useState(false);
  const [isInvalid, setIsInvalid ] = useState(false);
  const [ isSuccess, setIsSuccess ] = useState(false);

  const navigate = useNavigate();

  const setInfo = async (e) => {
    e.preventDefault();
    if(password != confirmPassword) {
      setIsInvalid(true);
      return;
    }

    try {
      await axios.post('http://localhost:3001/auth/signup', {
        firstName,
        lastName,
        username,
        password,
      })
      console.log("Successfully signed up");
      setIsSuccess(true);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(isInvalid) {
      setTimeout(() => {
        setIsInvalid(false);         
      },3000)
    }

    if(isSuccess) {
      setTimeout(() => {
        navigate('/auth/login');     
      },2000)
    }
  },[isInvalid, isSuccess] )

  return (
    <div className="m-8 overflow-x-hidden xxsm:m-5 md:m-14">
      <Navbar />
      <div className="grid md:place-items-center">
        <div className="bg-secondary border-2 border-[#686868] rounded-md py-6 px-4 mt-20 xxsm:w-11/12 xsm:w-full md:w-7/12 lg:w-5/12 xl:w-3/12 px-8">
          <h1 className="text-4xl font-header font-semibold text-blue text-center mb-9">Signup</h1>
            <form className="flex flex-col gap-2" onSubmit={setInfo}>
            <input type="text" className="focus:outline-none font-body bg-[#686868] rounded-md py-2 pl-3 text-white" placeholder="First Name" required onChange={(e) => setFirstName(e.target.value)}></input>
            <input type="text" className="focus:outline-none font-body bg-[#686868] rounded-md py-2 pl-3 text-white" placeholder="Last Name" required onChange={(e) => setLastName(e.target.value)}></input>
              <input type="text" className="focus:outline-none font-body bg-[#686868] rounded-md py-2 pl-3 text-white" placeholder="Username" required onChange={(e) => setUsername(e.target.value)}></input>
              <div className="grid grid-cols-1 place-items-center relative">
                <input
                  type={`${isVisible ? "text" : "password"}`}
                  className="focus:outline-none font-body bg-[#686868] rounded-md py-2 pl-4 text-white w-full"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <IoEyeSharp
                  className="absolute top-1/2 transform -translate-y-1/2 right-4 text-[#b8b8b8] cursor-pointer"
                  onClick={() => setIsVisible(!isVisible)}
                />
              </div>

              { isInvalid && <p className="text-red-500 text-sm font-body font-semibold">Password doesn't match</p>}
              <input type="password" className="focus:outline-none font-body bg-[#686868] rounded-md py-2 pl-4 text-white" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)}></input>
              <button className="bg-blue py-2 px-4 rounded-md cursor-pointer font-body font-semibold text-white mt-10 xl:mb-8">Sign Up</button>
              <h1 className="font-body text-center text-sm text-white mt-5">Already have an account? <Link to={'/auth/login'} className="text-blue italic">Log In</Link></h1>
            </form>
        </div>
        <img src={Bg} className="absolute w-2/4 xxxsm:top-32 -z-10 xxsm:top-20 xsm:top-0 w-11/12 xl:w-full h-auto"/>
      </div>
      <Footer />
    </div>
  )
}

export default Signup
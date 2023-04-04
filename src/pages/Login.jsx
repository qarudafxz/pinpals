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

function Login() {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ isVisible, setIsVisible ] = useState(false);
  const [_, setCookies] = useCookies(['access_token']);
  const [isInvalid, setIsInvalid ] = useState(false);

  const navigate = useNavigate();

  const submitInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(buildUrl('auth/login'), {
        username,
        password
      })

      setCookies('access_id', response.data.id);
      setCookies('access_token', response.data.token);
      useSetUserId(response);

      if(!response.data.token) {
        setIsInvalid(true);
        return;
      }

      navigate('/pins/all/');
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
  },[isInvalid] )

  return (
    <div className="m-8 overflow-x-hidden">
      <Navbar />
      <div className="grid place-items-center">
        <div className="bg-secondary border-2 border-[#686868] rounded-md py-6 px-4 mt-20 md:w-7/12 lg:w-5/12 xl:w-2/12">
          <h1 className="text-4xl font-header font-semibold text-blue text-center mb-9">Login</h1>
            <form className="flex flex-col gap-2" onSubmit={submitInfo}>
              <input type="text" className="focus:outline-none font-body bg-[#686868] rounded-md py-2 pl-3 text-white" placeholder="Username" required onChange={(e) => setUsername(e.target.value)}></input>
              <div className="relative">
                <input
                  type={isVisible ? "text" : "password"}
                  className="focus:outline-none font-body bg-[#686868] rounded-md py-2 pl-4 pr-12 text-white w-full"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <IoEyeSharp
                  className="absolute right-3 top-2 text-[#b9b9b9] text-xl cursor-pointer"
                  onClick={() => setIsVisible(!isVisible)}
                />
              </div>


              {
                isInvalid && <h1 className="font-body text-sm text-red-600 mt-2">Username or Password Incorrect</h1>
              }
              <button className="bg-blue py-2 px-4 rounded-md cursor-pointer font-body font-semibold text-white mt-10">Log In</button>
            </form>
            <h1 className="font-body text-center text-sm text-white mt-5">Don't have an account? <Link to={'/auth/signup'} className="text-blue italic">Get Started</Link></h1>
        </div>
        <img src={Bg} className="absolute top-48 -z-10"/>
      </div>
      <Footer />
    </div>
  )
}

export default Login
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Bg from '../assets/bg_2.png';
import process from 'process';
import jwt_decode from 'jwt-decode';

import { ReactComponent as Loading } from '../assets/loading.svg';

import { IoEyeSharp } from 'react-icons/io5';

import { buildUrl } from '../utils/buildUrl';
import { useSetUserId } from '../hooks/useSetUserId';

function Login() {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ isVisible, setIsVisible ] = useState(false);
  const [_, setCookies] = useCookies(['access_token']);
  const [isInvalid, setIsInvalid ] = useState(false);
  const [isLoaded, setIsLoaded ] = useState(true);
  const [ noGoogleAccount, setNoGoogleAccount ] = useState(false);
  const [ user, setUser ] = useState({});

  const navigate = useNavigate();

  const submitInfo = async (e) => {
    e.preventDefault();
    setIsLoaded(false);
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
        setIsLoaded(true);
        return;
      }
      navigate('/pins/all/');
    } catch(err) {
      console.log(err);
    }
  }

  const handleCallbackResponse = async (response) => {
    setIsLoaded(false);
    const user = jwt_decode(response.credential);
  
    try {
      const response = await axios.post(buildUrl('auth/googleLogin'), {
        firstName: user.name.toString()
      })

      setCookies('access_id', response.data.userID);
      setCookies('access_token', response.data.token);
      localStorage.setItem('userID', response.data.userID);

      setTimeout(() => {
        navigate('/pins/all/');
      },1500)
    } catch(err) {
      setNoGoogleAccount(true);
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    if(isInvalid) {
      setTimeout(() => {
        setIsInvalid(false);         
      },3000)
    }
  },[isInvalid] )

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id:"922739528134-8oeaqfup6ug03sdlt1i12qvuhg99s0rd.apps.googleusercontent.com",
        callback: handleCallbackResponse
      }) 
  
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "extra_large", shape: "rectangular", text: "continue_with", width: "270", height: "50"}
      )
    }
  }, [])
  

  return (
    <div className="m-8 overflow-x-hidden">
      <Navbar />
      <div className="grid place-items-center">
        <div className="bg-secondary border-2 border-[#686868] rounded-md py-6 px-4 mt-20 xxxsm:w-10/12 md:w-7/12 lg:w-5/12 xl:w-2/12">
          {
            !isLoaded && (
              <div className="grid place-items-center">
                <Loading className="pt-14"/>
                <h1 className="text-white font-logo text-xl mb-10">Loading pins</h1>
              </div>
            )
          }
          <h1 className="text-4xl font-header font-semibold text-blue text-center mb-9">Login</h1>
            <form className="flex flex-col gap-2" onSubmit={submitInfo}>
              { isInvalid && <h1 className="font-body text-sm text-red-600 mt-2">Username or Password Incorrect</h1> }
              { noGoogleAccount && <h1 className="font-body text-sm text-red-600 mt-2">Sign Up with Google first</h1> }
              <input type="text" className="focus:outline-none font-body bg-[#686868] rounded-md py-2 pl-3 text-white" placeholder="Username" required onChange={(e) => setUsername(e.target.value)}></input>
              <div className="relative">
                <input
                  type={isVisible ? "text" : "password"}
                  className="focus:outline-none font-body bg-[#686868] rounded-md py-2 pl-4 pr-12 text-white w-full"
                  placeholder="Password"
                  
                  onChange={(e) => setPassword(e.target.value)}
                />
                <IoEyeSharp
                  className={`absolute right-3 top-2 text-xl cursor-pointer ${isVisible ? "text-blue" : "text-[#b9b9b9]"}`}
                  onClick={() => setIsVisible(!isVisible)}
                />
              </div>
              <p className="text-[#686868] text-center"><hr className="relative top-3 w-5/12"/> <hr className="relative top-3 left-40 w-5/12"/>OR</p>
              <div id="signInDiv"></div>
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
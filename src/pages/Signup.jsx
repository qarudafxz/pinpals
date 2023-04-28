import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Bg from '../assets/bg_2.png';
import { IoEyeSharp } from 'react-icons/io5';
import jwt_decode from 'jwt-decode';
import TopLoadingBar from 'react-top-loading-bar';

import { buildUrl } from '../utils/buildUrl';
import { ReactComponent as Loading } from '../assets/loading.svg';

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
  const [isLoaded, setIsLoaded ] = useState(true);
  const [ user, setUser ] = useState({});
  const [ hasGoogleAccount, setHasGoogleAccount ] = useState(false);
  const [ progress, setProgress ] = useState(0);
  const navigate = useNavigate();

  const setInfo = async (e) => {
    e.preventDefault();
    setIsLoaded(false);
    setProgress(30);
    if(password != confirmPassword) {
      setIsInvalid(true);
      setIsLoaded(true);
      return;
    }

    try {
      await axios.post(buildUrl('auth/signup'), {
        firstName,
        lastName,
        username,
        password,
      })
      setProgress(100);
      console.log("Successfully signed up");
      setIsSuccess(true);
    } catch(err) {
      setHasGoogleAccount(true)
    }
  }

  const handleCallbackResponse = async (response) => {
    setProgress(30)
    const decoded = jwt_decode(response.credential);
    setUser(decoded)

    if(user) {
      try {
        await axios.post(buildUrl('auth/signup'), {
          firstName: decoded.name,
          lastName: decoded.name,
          username: decoded.name,
          password: "thisisdefaultpassword",
        })
        setProgress(100);
        console.log("Successfully signed up");
        setIsSuccess(true);
      } catch(err) {
        setHasGoogleAccount(true)
      }
    }
  }

  useEffect(() => {
    if(isInvalid) {
      setTimeout(() => {
        setIsInvalid(false);         
      },3000)
    }

    if(hasGoogleAccount) {
      setTimeout(() => {
        setHasGoogleAccount(false);         
      },3000)
    }

    if(isSuccess) {
      setTimeout(() => {
        navigate('/auth/login');     
      },2000)
    }
  },[isInvalid, isSuccess, hasGoogleAccount] )

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id:"922739528134-8oeaqfup6ug03sdlt1i12qvuhg99s0rd.apps.googleusercontent.com",
        callback: handleCallbackResponse
      }) 
  
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: `${window.innerWidth >= 280 && window.innerWidth <= 270 ? 220 
            : window.innerWidth > 375 && window.innerWidth <= 425 ? 290 
            : window.innerWidth > 425 && window.innerWidth <= 1024 ? 390 
            : window.innerWidth > 1024 && window.innerWidth <= 1440 ? 295 
            : window.innerWidth > 1440 && window.innerWidth <= 2560 ? 450 : 200
          }`,
          height: "50",
          longtitle: "true",
          onsuccess: signInDiv,
          onfailure: signInDiv,
        }
      )
    }
  }, [])

  return (
    <div>
      <Navbar />
      <TopLoadingBar
        color="#3B82F6"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={6}
      />
      <div className="mx-8 md:m-0">
        <div className="m-auto bg-secondary border-2 border-[#686868] rounded-md py-6 px-4 mt-20 xsm:w-full md:w-7/12 lg:w-5/12 xl:w-3/12 px-8">
          <h1 className="text-4xl font-header font-semibold text-blue text-center mb-9">Signup</h1>
            { hasGoogleAccount && <h1 className="my-4 font-body text-sm text-red-600 mt-2">Account already exists</h1> }
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
                  className={`absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer ${isVisible ? "text-blue" : "text-[#b8b8b8]"}`}
                  onClick={() => setIsVisible(!isVisible)}
                />
              </div>
              <input type="password" className="focus:outline-none font-body bg-[#686868] rounded-md py-2 pl-3 text-white" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)}></input>
              { isInvalid && <p className="text-red-500 text-sm font-body font-semibold">Password doesn't match</p>}
              <div className="flex flex-row items-center place-content-center my-2">
                <hr className="w-5/12 border-[#505050] "/>
                <p className="px-10 text-[#505050] text-sm">OR</p>
                <hr className="w-5/12 border-[#505050] "/>
              </div>
              <div id="signInDiv" className="w-full"></div>
              <button className="bg-blue py-2 px-4 rounded-md cursor-pointer font-body font-semibold text-white mt-10 xl:mb-8">Sign Up</button>
              {
                !isLoaded && (
                  <div className="grid place-items-center">
                    <Loading className="pt-12" />
                    <h1 className="text-white font-logo text-xl mb-10">Creating account...</h1>
                  </div>
                )
              }
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
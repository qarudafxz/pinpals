import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { buildUrl } from '../utils/buildUrl.js';
import { useGetUserId } from '../hooks/useGetUserId.js';

import { ReactComponent as Loading } from '../assets/loading.svg';

const ChangePassword = ({isChangePassword}) => {
  const [ password, setNewPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ isPasswordChangeSuccessful, setIsPasswordChangeSuccessful ] = useState(false);
  const [ passwordInvalid, setPasswordInvalid ] = useState(false);
  const [ passwordEmpty, setPasswordEmpty ] = useState(false);
  const [ isLoaded, setIsLoaded ] = useState(true);
  const navigate = useNavigate();
  const userID = useGetUserId();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if(password.length <= 0) {
      setPasswordEmpty(true);
      return;
    }

    if(password !== confirmPassword) {
      setPasswordInvalid(true);
      return;
    }

    try {
      await axios.put(buildUrl(`auth/change-password/${userID}`), {
        password,
      })
      setIsLoaded(false);
      setIsPasswordChangeSuccessful(true);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(isPasswordChangeSuccessful) {
      setTimeout(() => {
        window.localStorage.removeItem('userID');
        navigate('/auth/login');
      }, 4000)
    }

    if(passwordInvalid) {
      setTimeout(() => {
        setPasswordInvalid(false);
      }, 2000)
    }

    if(passwordEmpty) {
      setTimeout(() => {
        setPasswordEmpty(false);
      },1800)
    }
  }, [isPasswordChangeSuccessful, passwordInvalid, passwordEmpty])
  
  return (
    <div className="">
      {
        isChangePassword && (
          <form onSubmit={handleChangePassword} className="grid grid-rows-3 gap-2 mt-10 border-2 border-[#1F1F1F] rounded-md py-4 px-6 shadow-2xl">
            {
              !isLoaded && <Loading className="p-4"/>
            }
            {
              passwordInvalid && <h1 className="font-body text-sm text-red-600 mt-2">Password doesn't match!</h1>
            }
            {
              passwordEmpty && <h1 className="font-body text-sm text-red-600 mt-2">Password cannot be empty!</h1>
            }
            <input type="password" placeholder="Input new password" className="bg-[#3b3b3b] rounded-md p-2 font-body font-medium text-sm text-white focus:outline-none w-full" onChange={(e) => setNewPassword(e.target.value)}></input>
            <input type="password" placeholder="Confirm new password" className="bg-[#3b3b3b] rounded-md p-2 font-body font-medium text-sm text-white focus:outline-none w-full" onChange={(e) => setConfirmPassword(e.target.value)}></input>
            <button type="submit" className="font-body font-regular text-sm text-white bg-blue rounded-md focus:outline-none w-full py-2">Update Password</button>
            {
              isPasswordChangeSuccessful && <h1 className="font-body text-sm text-green-600 mt-2">Password successfully changed!</h1>
            }
          </form>
        )
      }
    </div>
  )
}

export default ChangePassword
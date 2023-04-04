import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import { AiOutlineCamera } from 'react-icons/ai';
import axios from 'axios';

import { useGetUserId } from '../hooks/useGetUserId.js';

import Logout from '../components/Logout';

function Pins() {
  const [pinName, setPinName] = useState("");
  const [pinLink, setPinLink] = useState("");
  const [firstName, setFirstName] = useState("");
  const [ isAddPhoto, setIsAddPhoto ] = useState(false);
  const [ imageLink, setImageLink ] = useState("");
  const [ responseImage, setResponseImage ] = useState("");
  const [ pins, setAllPins ] = useState([]);

  const navigate = useNavigate();
  const userID = useGetUserId();

  const fetchAllPins = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/pins/all/${userID}`);
      setAllPins(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  const createPin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/pins/add-pin`, {
        pinName,
        pinLink,
        pinOwner: userID
      })

      await fetchAllPins();
    } catch(err) {
      console.log(err);
    }
  }

  const getFirstName = async () => {
    const response = await axios.get(`http://localhost:3001/auth/firstname/${userID}`)
    setFirstName(response.data);
  }

  const deletePin = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/pins/delete/${id}`)
      console.log(id);
      fetchAllPins();
    } catch(err) {
      console.log(err);
    }
  }

  const addImage = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/auth/photo/${userID} `, {
        imageUrl: imageLink
      })

      window.location.reload();
    } catch(err) {
      console.log(err);
    }
  }

  const getImageLink = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/image/${userID}`)
      setResponseImage(response.data);
      // console.log("Image fetched successfully");
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(!userID) {
      alert('Please login first')
      navigate('/auth/login')
    }

    getImageLink();

    fetchAllPins()
    getFirstName();
  }, []);

  return (
    <div className="m-8 overflow-x-hidden  md:m-20">
      <Logout />
      <div>
        <div className="flex flex-row gap-6 my-16 place-content-center items-center">
            {
              responseImage ? (
                <img src={responseImage} alt="profile" className="w-24 h-auto rounded-full md:w-32" onClick={() => setIsAddPhoto(!isAddPhoto)}/>
              ) : (
              <div className="grid place-items-center bg-[#2c2c2c] px-4 py-6 rounded-full" onClick={() => setIsAddPhoto(!isAddPhoto)}>
                <AiOutlineCamera className="text-white text-2xl" />
                <p className="text-lg text-sm">Add Photo</p>
              </div>
              )
            }
          <div>
            <h1 className="text-md font-body font-normal text-white text-center md:text-3xl">Welcome Back!</h1>
            <h1 className="text-2xl font-body font-semibold text-blue md:text-5xl">{firstName}</h1>
          </div>
        </div>
        {isAddPhoto && (
        <div>
          <form onSubmit={addImage} className="flex flex-col gap-2 border-2 border-[#1F1F1F] rounded-md py-4 px-6 shadow-2xl mt-6">
            <input type="text" placeholder="Paste Image Url Here" className="bg-[#3b3b3b] rounded-md p-2 font-body font-medium text-sm text-white focus:outline-none w-full" required onChange={(e) => setImageLink(e.target.value)} />
            <button type="submit" className="font-body font-regular text-sm text-white bg-blue rounded-md focus:outline-none w-full py-2">Add Photo</button>
          </form>
        </div>
      )}
        <form onSubmit={createPin} className="flex flex-col gap-2 border-2 border-[#1F1F1F] rounded-md py-4 px-6 shadow-2xl mt-6">
          <input type="text" placeholder="Enter Pin Title (e.g Facebook Portal)" className="bg-[#3b3b3b] rounded-md p-2 font-body font-medium text-sm text-white focus:outline-none w-full" required onChange={(e) => setPinName(e.target.value)} />
          <div className="flex flex-row gap-2">
            <input type="text" placeholder="Paste URL (e.g https://facebook.com)" className="bg-[#3b3b3b] rounded-md p-2 font-body font-medium text-sm text-white focus:outline-none w-9/12" required onChange={(e) => setPinLink(e.target.value)} />
            <button type="submit" className="font-body font-regular text-sm text-white bg-blue rounded-md focus:outline-none w-5/12">Add Pin</button>
          </div>
        </form>
      </div>
      <div className="mt-9 md:grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          pins.map(pin => {
            return (
              <div className="flex flex-row justify-between gap-4 bg-[#2D2D2D] py-2 px-4 rounded-md items-center" key={pin._id}>
                <a href={pin.pinLink} target="_blank" className="font-body font-medium text-sm text-white">{pin.pinName}</a>
                <div className="flex flex-row gap-2">
                  <a href={pin.pinLink} target="_blank"><FiArrowUpRight className="text-white text-xl"/></a>
                  <BsTrash className="text-white text-xl cursor-pointer" onClick={() => deletePin(pin._id)}/>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Pins
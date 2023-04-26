import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiFillGithub } from 'react-icons/ai';
import { SiStackexchange } from 'react-icons/si';
import { RxCube } from 'react-icons/rx';
import { BsGrid3X3 } from 'react-icons/bs';
import { ReactComponent as Bg } from '../assets/bg.svg';
import { motion } from 'framer-motion';
import TopLoadingBar from 'react-top-loading-bar'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
  const location = useLocation();
  const [ progress, setProgress ] = useState(0);

  useEffect(() => {
    setProgress(30);
    setTimeout(() => {
      setProgress(100);
    },1500);
  },[location])

  return (
    <div className="xxxsm:m-6 xxsm:m-8 xsm:m-14 sm:m-8 lg:m-32 xl:m-34">
      <Navbar />
      <TopLoadingBar
        color="#0067c7"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={6}
      />
      <div className="flex flex-col gap-7 mt-14 xsm:h-2/3 md:grid grid-rows-2 place-items-center max-h-screen lg:flex-row mb-0 xl:flex flex-row mb-28">
       <div className="md: w-full">
          <h1 className="font-header text-white text-xl text-left sm:text-4xl xl:text-7xl">
            Pin your tabs, keep them intact with no more <span className="text-secondary">memory wastage</span>
          </h1>
          <p className="text-center text-white font-body text-xs sm:text-lg mt-4 lg:text-left xl:text-left">
            Is your device cannot handle multiple pinned tabs or do you find it hassle when having numerous pinned tabs? Centralize your pinned tabs with our one-stop library box website.
          </p>
          <div className="grid grid-cols-2 place-items-center gap-4 mt-8 xsm:flex flex-row gap-2 place-content-center xl:place-content-start">
            <button className="hover:bg-[#0067c7] font-body font-semibold bg-blue text-white py-6 px-4 rounded-md text-xs xxxsm:py-5 sm:text-lg">
              <Link to={'/auth/login'} className="sm:text-white">Get Started</Link>
            </button>
            <div className="grid grid-cols-1 place-items-center">
              <a href="https://github.com/francistinao/pinpals" target="_blank">
                <button button className="hover:bg-[#2c2c2c] flex space-x-3 gap-2 font-body font-semibold bg-secondary border-2 border-[#686868] text-white p-4 rounded-md text-xs items-center sm:text-lg py-5">
                  Github Repo 
                <AiFillGithub className="text-2xl text-white xxxsm:hidden lg:block"/>
              </button>
              </a>
            </div>
        </div>
       </div>
        <div>
          <Bg className="relative w-auto h-96 right-28 xxxsm:right-2 xsm:h-80 right-12 sm:h-2/4"/>
        </div>
      </div>
      <h1 className="font-header text-2xl text-white tracking-wide mb-7 sm:text-5xl"> Why <span className="text-blue">Pinpal?</span> </h1>
      <div className="xxxsm:grid grid-rows-3 gap-3 xsm:gap-6 sm:grid grid-rows-3 lg:grid-cols-3 xl:flex flex-row">
        <motion.div  whileHover={{
            scale: 1.04924,
            transition: { duration: 1 },
        }}>
          <div className="w-full bg-secondary py-8 px-4 border-2 border-[#5B5B5B] rounded-lg lg:h-72 xl:h-card">
            <div className="flex flex-col gap-4">
              <SiStackexchange className="text-blue text-4xl xl:text-6xl"/>
              <h1 className="font-body font-regular text-white text-2xl font-bold xl:text-3xl">Remove numerous pinned tabs</h1>
              <p className="text-sm text-lg xl:text-xl">Say goodbye to cluttered tabs and memory hogging! Pinpal streamlines your browsing experience by removing numerous pinned tabs and keeping your favorite sites in one organized location.</p>
            </div>
          </div>
        </motion.div>
        <motion.div  whileHover={{
            scale: 1.04924,
            transition: { duration: 1 },
        }}>
          <div className="w-full bg-secondary py-8 px-4 border-2 border-[#5B5B5B] rounded-lg lg:h-72 xl:h-card">
            <div className="flex flex-col gap-4">
              <RxCube className="text-blue text-4xl xl:text-6xl"/>
              <h1 className="font-body font-regular text-white text-2xl font-bold xl:text-3xl">Save Memory</h1>
              <p className="text-sm text-lg xl:text-xl">Keep your browsing experience simple and efficient with Pinpal! It saves memory and declutters your screen by centralizing your pinned tabs, making it easy to access your most visited websites with just a click.</p>
            </div>
          </div>
        </motion.div>
        <motion.div  whileHover={{
            scale: 1.04924,
            transition: { duration: 1 },
        }}>  
          <div className="w-full bg-secondary py-8 px-4 border-2 border-[#5B5B5B] rounded-lg lg:h-72 xl:h-card">
            <div className="flex flex-col gap-4">
              <BsGrid3X3 className="text-blue text-4xl xl:text-6xl"/>
              <h1 className="font-body font-regular text-white text-2xl font-bold xl:text-3xl">Avoid Disorganized Tabs</h1>
              <p className="text-sm text-lg xl:text-xl">Pinpal provides a seamless solution to keep your browsing organized. Say hello to faster, smoother browsing with our one-stop app.</p>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
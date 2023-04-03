import React from 'react'
import Logo from '../assets/logo.png';

function Footer() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-10 mt-36 border-t-2 border-t-[#5B5B5B] pt-10 xl:mt-72">
        <ul className="flex flex-col gap-4">
          <li className="text-white font-body font-semibold text-lg">Socials</li>
          <li className="text-lg font-body font-normal text-sm"><a href="https://facebook.com/francisj.tinao/" target="_blank">Facebook</a></li>
          <li className="text-lg font-body font-normal text-sm"><a href="https://twitter.com/francistinao_" target="_blank">Twitter</a></li>
          <li className="text-lg font-body font-normal text-sm"><a href="https://instagram.com/francis.tinao/" target="_blank">Instagram</a></li>
        </ul>
        <ul className="flex flex-col gap-4">
          <li className="text-white font-body font-semibold text-lg">Open Source</li>
          <li className="text-lg font-body font-normal text-sm">Bug Report</li>
          <li className="text-lg font-body font-normal text-sm">Contribute</li>
        </ul>
      </div> 
      <div className="grid grid-rows-3 place-items-center mt-12 xsm: mt-28 sm:mt-36 md:mt-44 xl:place-items-end">
        <img src={Logo} />
        <p className="text-lg text-sm font-body">Ⓒ 2023 Francis John Tin-ao</p>
      </div>
    </div>
  )
}

export default Footer
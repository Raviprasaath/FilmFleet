import React from 'react'
import { useSelector } from 'react-redux';

const Footer = () => {
    const {screenMode} = useSelector((state)=>state.movieReducer);
  return (
    <div className={`py-[20px] text-center ${screenMode==="dark"?"bg-slate-800 text-white":"bg-white text-black"}`}>
        copy rights @Raviprasaath
    </div>
  )
}

export default Footer

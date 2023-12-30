import React, { useEffect, useState } from 'react'
import Navbar from "../Components/Navbar/Navbar"
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import { useScreenSize } from '../Components/CustomHook/ScreenSize'
import { Link } from 'react-router-dom';
import { screenModeToggler, sideBarStore } from '../slice/slice'
import { CiLight } from "react-icons/ci";
import { MdWatchLater } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import AppBreadCrumbs from '../Components/AppBreadCrumbs/AppBreadCrumbs'

const RootLayout = () => {
  const { sideBar, screenMode:screenModeGlobal } = useSelector((state) => state.movieReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  
  const [isWindow, setIsWindow] = useState(false);    
  const screenSize = useScreenSize();
  const [screenMode, setScreenMode] = useState("dark")

  const [loginCheck, setLoginCheck] = useState(false);
  const [snakeBar, setSnakeBar] = useState(false);

  const handlerSideBar = () => {
    dispatch(sideBarStore(false));
  }
  const handlerDarkModeToggler = () => {
    {screenMode === "light" ? setScreenMode("dark"):setScreenMode("light")}
    dispatch(screenModeToggler(screenMode));
  }
  const userLocalCheck = JSON.parse(localStorage.getItem('userDetails')) || [];

  const handlerWatchList = () => {
    if(!loginCheck) {
        setSnakeBar(true);
    }
    setTimeout(()=> {
        setSnakeBar(false);
    }, 1500)
    if(loginCheck) {
        navigate('/watch-later', {replace: true});
    }
  }
  const handlerCloseSnakeBar = () => {
    setSnakeBar(false);
  }

  const handlerLogout = () => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('watchList');
    setLoginCheck(false);
  }
  useEffect(()=> {
    if (screenSize < 960) {
        setIsWindow(false);
    } else {
        setIsWindow(true);
    }
    setScreenMode(screenModeGlobal);
}, [screenSize, sideBar, screenModeGlobal])

useEffect(()=> {
  if (userLocalCheck.email) {
      setLoginCheck(true);
  } else if (location.pathname.includes('watch-later') && !userLocalCheck.email) {
      navigate('/', {replace: true});
  }
}, [loginCheck, location.pathname])


  return (
    <div>
        <Navbar />
        {!isWindow && sideBar &&
            <section className='fixed flex w-full h-full top-0 left-0 bottom-0 right-0 z-10'>
                <div  className={`min-w-[200px] text-center h-full ${screenMode==="dark"? 'bg-slate-800 text-white border-r-[1px]	':'bg-white text-black border-r-[1px] border-black'} flex flex-col items-center gap-3 p-10`}>
                      <Link onClick={()=> handlerSideBar()} className='flex justify-center items-center gap-2' to={'/'}>
                        <IoMdHome />
                        Home
                      </Link>
                      <button title='Dark/Light Mode' onClick={()=>handlerDarkModeToggler()}>
                          {screenMode === "light" ? <div className='flex justify-center items-center gap-2'><MdOutlineDarkMode className='text-[20px]' /> Dark Mode</div> : <div className='flex justify-center items-center gap-2'><CiLight className='text-[20px]' /> Light Mode</div>} 
                      </button>
                      <div  className='relative'>
                          <div onClick={()=>{handlerWatchList()}} title='Watch Later' className=' cursor-pointer flex justify-center items-center gap-2'>
                            <MdWatchLater />
                            Watch Later
                          </div>
                          {snakeBar &&
                              <div className='absolute z-10 flex justify-between items-center rounded-lg bg-red-500 w-[200px] py-2 px-1'>
                                  <p>
                                      Login to Continue
                                  </p>
                                  <div onClick={()=>handlerCloseSnakeBar()} className='text-[18px]'>
                                      <IoMdCloseCircle />
                                  </div> 
                              </div>
                          }
                      </div>
                      {!loginCheck ? 
                          (<div className='flex flex-col gap-4'>
                              <Link onClick={()=> handlerSideBar()} to='user-authentication/login' className='flex justify-center items-center gap-2'>
                                  <IoIosLogIn />
                                  Log In
                              </Link>
                              <Link onClick={()=> handlerSideBar()} to='user-authentication/signup' className='flex justify-center items-center gap-2'>
                                  <FaUserCircle />
                                  Sign Up
                              </Link>
                          </div>):(
                              <div onClick={()=>{handlerLogout(), handlerSideBar()} } className='cursor-pointer flex justify-center items-center gap-2'>
                                <RiLogoutBoxLine />
                                Log out
                              </div>
                          )
                      }
                  
                </div>
                <div onClick={()=> handlerSideBar()} className='w-[85%] h-full bg-opacity-25 backdrop-blur-sm p-6 rounded-md shadow-md'>
                  
                </div>
            </section>
        }
        <AppBreadCrumbs />
        <Outlet />
        <Footer />
    </div>
  )
}

export default RootLayout

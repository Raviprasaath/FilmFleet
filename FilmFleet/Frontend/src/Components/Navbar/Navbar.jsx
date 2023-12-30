import React, { useEffect, useState } from 'react'
import logo from "../../assets/movie-logo.png"
import { FaSearch } from "react-icons/fa";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux'
import { gettingSearchList, screenModeToggler, sideBarStore } from '../../slice/slice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdWatchLater } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { useScreenSize } from '../CustomHook/ScreenSize';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();    
    const {screenMode:screenModeGlobal} = useSelector((state)=>state.movieReducer)
    const [screenMode, setScreenMode] = useState("dark")
    const [loginCheck, setLoginCheck] = useState(false);
    const [snakeBar, setSnakeBar] = useState(false);
    const [isWindow, setIsWindow] = useState(false);    
    const [sideBar, setSideBar] = useState(false);

    const [typingValues, setTypingValues] = useState("");
    const [searchValue, setSearchValue] = useState("");


    const screenSize = useScreenSize();
    const userLocalCheck = JSON.parse(localStorage.getItem('userDetails')) || [];
    const handlerDarkModeToggler = () => {
        {screenMode === "light" ? setScreenMode("dark"):setScreenMode("light")}
        dispatch(screenModeToggler(screenMode));
    }

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

    const handlerSideBar = () => {
        setSideBar(true);
        dispatch(sideBarStore(true));
    }

    const handlerSearch = (e) => {
        setTypingValues(e.target.value);
    }

    const searchBtn = () => {
        if (typingValues) {
            setSearchValue(typingValues);
            dispatch(gettingSearchList({queryValue: typingValues, page: 1}));
            navigate('/search-result', {replace: true})
            setTypingValues('')
        }
    }

    useEffect(()=> {
        if (userLocalCheck.email) {
            setLoginCheck(true);
        } else if (location.pathname.includes('watch-later') && !userLocalCheck.email) {
            navigate('/', {replace: true});
        }
    }, [loginCheck, location.pathname])

    useEffect(()=> {
        if (screenSize < 960) {
            setIsWindow(false);
        } else {
            setIsWindow(true);
        }
        setScreenMode(screenModeGlobal);
    }, [screenSize, sideBar, screenModeGlobal])



  return (
    <section className={`flex sticky top-0 z-10 items-center justify-between px-4 ${screenMode==="dark"? 'bg-slate-800 text-white border-b	':'bg-white text-black border-b border-black'}`}>
        {!isWindow && <FaBars onClick={()=>handlerSideBar()} className='absolute'/> }
        <Link to='/'>
            <img src={logo} alt="logo" className='w-[150px] my-3' />
        </Link>
        <div className='flex gap-4 items-center justify-center'>
            <div className='flex items-center justify-center gap-4'>
                <input onChange={(e)=>handlerSearch(e)} value={typingValues} type="text" className={`border-b	w-[150px] ${screenMode==="dark"? 'bg-slate-800 text-white':'bg-white text-black border-black'}`} />
                <FaSearch onClick={()=>searchBtn()} className='hover:text-gray-400' />
            </div>
            {isWindow &&
                <>
                    <button title='Dark/Light Mode' onClick={()=>handlerDarkModeToggler()} className='text-[22px]'>
                        {screenMode === "light" ? <MdOutlineDarkMode /> : <CiLight />} 
                    </button>
                    <div className='relative'>
                        <MdWatchLater onClick={()=>handlerWatchList()} title='Watch Later' className='text-[20px] cursor-pointer' />
                        {snakeBar &&
                            <div className='absolute flex justify-between items-center rounded-lg top-10 -left-10 bg-red-500 w-[200px] py-2 px-1'>
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
                        (<>
                            <Link to='user-authentication/login'>
                                Log In
                            </Link>
                            <p>/</p>
                            <Link to='user-authentication/signup'>
                                Sign Up
                            </Link>
                        </>):(
                            <div onClick={()=>handlerLogout()} className='cursor-pointer'>Log out</div>
                        )
                    }
                </>
            }
        </div>

    </section>
  )
}

export default Navbar

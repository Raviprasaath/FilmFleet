import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Discuss } from 'react-loader-spinner'
import { getSingleMovie, gettingWatchList } from '../../slice/slice';
import { useDispatch, useSelector } from 'react-redux';
import image from "../../assets/popcorn.png"

const WatchLater = () => {
    const navigate = useNavigate();
    const dispatch= useDispatch();
    const { screenMode, singleMovieFetch } = useSelector((state) => state.movieReducer);
    const [loader, setLoader] = useState(true);
    const [dataLoad, setDataLoad] = useState([]);
    const [loginCheck, setLoginCheck] = useState(false);
    const [tokenValue, setTokenValue] = useState('');
    const userLocalCheck = JSON.parse(localStorage.getItem('userDetails')) || [];

    const handlerDispatch = (idVal) => {
        dispatch(getSingleMovie({id: idVal}));
    }

    useEffect(()=> {
        if (userLocalCheck.email) {
            setLoginCheck(true);
            setTokenValue(userLocalCheck.accessToken)

            const result = dispatch(gettingWatchList({
                tokenValue: userLocalCheck.accessToken,
                methods: "GET",
                suffix: "watch-later/",
                movie: "",
            }))
            result.then((res=>{
                const response = res.payload;
                const tempArr = response.map((item)=>item.detail);
                setDataLoad(tempArr);
                setLoader(false);
            }))

        } else {
            navigate('/', {replace: true});
        }
    }, [loginCheck]);

    return (
        <div className={`min-h-[80vh] flex flex-col justify-center items-center ${screenMode==="dark"?"bg-slate-800 text-white":"bg-white text-black"}`}>
            <div id='check'className={`flex flex-row justify-center flex-wrap gap-4 px-2 py-4 `}  >
                {dataLoad.length > 0 ? dataLoad?.map((item)=> (
                    <Link key={item.id * Math.random()} onClick={()=>handlerDispatch(item.id)}  to={`${item.title}`}>
                        <div className='w-[150px] cursor-pointer flex flex-col justify-center items-center hover:opacity-60'>
                            {loader ? (<div className={`flex justify-center items-center ${screenMode==="dark"?"bg-slate-800 text-white":"bg-white text-black"}`}>
                                <Discuss
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="discuss-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="discuss-wrapper"
                                    color="#fff"
                                    backgroundColor="#F4442E"
                                    />
                            </div>):(
                                <img className='w-[150px]' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="img" />
                            )}
                            {item.title}
                        </div>
                    </Link>
                )):(
                    <div className='relative flex flex-col justify-center items-center'>
                            <img src={image} className='h-[80vh]' alt="" />
                            <p className='text-[35px] absolute bg-red-500 px-4 py-2 rounded-lg left-[42%]'>Its Empty!</p>
                    </div>
                )
            }

            </div>
        </div>
    )
}

export default WatchLater

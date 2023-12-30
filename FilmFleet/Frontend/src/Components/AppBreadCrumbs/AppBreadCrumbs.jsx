import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material'
import { useSelector } from 'react-redux';

const AppBreadCrumbs = () => {
    const location = useLocation();
    const [linkDisable, setLinkDisable] = useState(false);
    const navigate = useNavigate();
    const { screenMode, sideBar } = useSelector((state) => state.movieReducer);


  let crumbLink = '';  
  let crumbPath = location.pathname.split('/').filter((item)=>item !== '')
    .map((crumb)=>{
        const decodedCrumb = decodeURIComponent(crumb);
        crumbLink += `/${crumb}`;
        return <Link to={crumbLink} key={crumb}>{decodedCrumb}</Link>;
      })
  
  useEffect(()=> {
    setLinkDisable(crumbPath[0]?.key === 'movie' || crumbPath[0]?.key === 'user-authentication');
    if (location.pathname === '/upcoming' || location.pathname === '/now-showing' || location.pathname === '/popular' || location.pathname === '/top-rated') {
      navigate(`/${crumbPath[0]?.key}/page-1`);
    }
  }, [location.pathname]);

  return (
    <>
        {linkDisable?null:(
            <div className={`fixed ${sideBar ?'z-8':'z-10' }  top-[90px] mx-5 px-4 ${screenMode === "dark" ? "bg-gray-500" : "bg-gray-300"}`} >
                <Breadcrumbs aria-label="breadcrumb" style={{ fontSize:"14px", color: screenMode === "dark" ? "#ffffff" : "#000000" }}>
                    {crumbPath}
                </Breadcrumbs>
            </div>
        )}
    </>
  )
}

export default AppBreadCrumbs
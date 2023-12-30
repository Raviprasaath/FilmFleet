import React, { useEffect, useState } from 'react'

export const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(()=> {
        window.addEventListener('resize', handleResize);

        function handleResize () {
            setScreenSize(window.innerWidth);
        }

        return (()=>window.removeEventListener('resize', handleResize));

    }, [])

    return screenSize;
}

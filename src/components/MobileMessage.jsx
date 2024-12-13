import React, {  useState, useEffect } from 'react'

const MobileMessage = () => {
    const [isMobile, setIsMobile] = useState(false)

    const checkDevice = () => {
        console.log('Checking screen size:', window.innerWidth);
        if (window.innerWidth <= 768) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        checkDevice()
        window.addEventListener('resize', checkDevice)

        return () => window.removeEventListener('resize', checkDevice)
    }, []);

    if (!isMobile) return null
    

    return (
        <div className='mobile-message'>
            <p>Por favor, abre esta página en un ordenador para disfrutar de su contenido.</p>
        </div>
    )
}

export default MobileMessage

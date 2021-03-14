import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context'

import axios from 'axios'

import './styles.css'
import creative_ink from '../../Images/quill.png'
import ham from '../../Images/ham.png'

const url = "http://localhost:5000"

const NavBar = () => {
    
    const [isAuth, setIsAuth] = useContext(Context)
    const [isSmallDevice, setIsSmallDevice] = useState(false)

    const toggleSmallNavOptions = () => {
        console.log('I got fucking clicked')
        setIsSmallDevice(prev => !prev)
    }

    const disappear = () => {
        setIsSmallDevice(false)
    }

    useEffect(() => {
        if(isSmallDevice === true){
            document.body.style.overflow = "hidden"
        }
        else{
            document.body.style.overflow = "visible"
        }
    }, [isSmallDevice])

    useEffect(() => {
        localStorage.setItem('isAuth', isAuth)
    }, [isAuth])

    window.addEventListener('storage', (event) => {
        // console.log("IT IS HAPPENING")
        if (event.key === 'isAuth') { 
            window.location.reload()
        }
    })
    
    const clickHandler = () => {
        localStorage.clear()
        setIsAuth(false)
        axios.get(`${url}/clearcookies`, {withCredentials: true})
    }

    return(
        <>
            <nav className="navbar">
                <div className="outer">
                <Link to="/">
                    <div className="logo" onClick={disappear}>
                        <div>Creative.Inc</div>
                        <img src={creative_ink} alt="imtoolazytowritealt"/>
                    </div>
                </Link>               
                
                        <Link to="/prompts"><div className="nav-options-large">Prompts</div></Link>
                        <div className="nav-options-large">Hall of Ink</div>
                        { (isAuth)? <Link to="/drafts"><div className="nav-options-large">Drafts</div></Link> : null }
                        <Link to="/weave"><div className="nav-options-large">Weave</div></Link>
                        { (!isAuth)? <Link to="/signup"><div className="nav-options-large">Sign Up</div> </Link> : <Link to="/" onClick={clickHandler}><div className="nav-options-large">Log Out</div></Link> }
                
                <img src={ham} alt="lick mah balls" className="hamburger" onClick={toggleSmallNavOptions}></img>                      
                </div>
                
            </nav>

            { isSmallDevice ? 
                
                    <div className="xxx">
                        <div className="nav-options-small">
                            {/* <img alt="idontgiveafuckaboutalt" src={x} onClick={toggleSmallNavOptions} /> */}
                            <Link to="/prompts" onClick={toggleSmallNavOptions}><div className="top-option">Prompts</div></Link>
                            <div onClick={toggleSmallNavOptions}>Hall of Ink</div>
                            { (isAuth)? <Link to="/drafts" onClick={toggleSmallNavOptions}><div>Drafts</div></Link> : null }
                            <Link to="/weave" onClick={toggleSmallNavOptions}><div>Weave</div></Link>
                            { (!isAuth)? <Link to="/signup" onClick={toggleSmallNavOptions}><div>Sign Up</div> </Link> : <Link to="/" onClick={() => {clickHandler(); toggleSmallNavOptions()}}><div>Log Out</div></Link> }
                        </div>
                    </div> 
                
                : null
            }       

        </>

    )
}

export default NavBar
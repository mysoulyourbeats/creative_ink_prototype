import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context'

import axios from 'axios'

import './styles.css'
import creative_ink from '../../Images/orange_ink.png'

const url = "http://localhost:5000"

const NavBar = () => {
    
    const [isAuth, setIsAuth] = useContext(Context)

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
        <nav className="navbar">
            <div className="outer">
            <Link to="/">
                <div className="logo">
                    <img src={creative_ink} width="70" height="70" alt="imtoolazytowritealt"/>
                    <div>Creative.Inc</div>
                </div>
            </Link>               
                <Link to="/prompts"><div>Prompts</div></Link>
                <div>Hall of Ink</div>
                { (isAuth)? <Link to="/drafts"><div>Drafts</div></Link> : null }
                <div>Pen Fight</div>
                { (!isAuth)? <Link to="/signup"><div>Sign Up</div> </Link> : <Link to="/" onClick={clickHandler}>Log Out</Link> }
            </div>
        </nav>


    )
}

export default NavBar
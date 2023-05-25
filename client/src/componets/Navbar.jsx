import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/auth.context'
import { Link } from 'react-router-dom'
import "../styles/Navbar.css"

export const Navbar = () => {
    const { loadUser, user } = useContext(AuthContext)

    const logOut = () => {
        localStorage.clear()
        loadUser()
        window.location.reload()
    }

    return (
        <nav>
            <Link to="/" className='home-link'>{"Gallery"}</Link>
            {
                user ?
                    <button className='logout-btn' onClick={() => logOut()}>
                        LOGOUT
                    </button> :
                    <div className='link-container'>
                        <button>
                            <Link to={"/signup"} className='link'>SIGNUP</Link>
                        </button>
                        <button >
                            <Link to={"/login"} className='link'>LOGIN</Link>
                        </button>
                    </div>
            }
        </nav>
    )
}

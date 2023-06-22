import React, { useRef, useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import "./Header.modulus.css"

const Header = (props) => {
    const [path, setPath] = useState(window.location.pathname)
    const header = useRef()
    window.onscroll = () => {
        if (window.scrollY > 0) {
            header.current.classList.add('active')
        } else {
            header.current.classList.remove('active')
        }
    }
    useEffect(() => {
        setPath(window.location.pathname)
    }, [window.location.pathname])
    return (
        <header>
            <div className={path === "/profile" ? `contain rel` : `contain`} ref={header}>
                <div className="logo">
                    web<span>Ghoul</span>.
                </div>

                <ul className="lists">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/blogs">Blogs</NavLink>
                    </li>
                    {!props.authUser ?
                        <>
                            <li>
                                <NavLink to="/signIn">Sign In</NavLink>
                            </li>
                            <li>
                                <NavLink to="/signUp">Sign Up</NavLink>
                            </li>
                        </>
                        :
                        <>
                            <li>
                                <NavLink to="/profile">Profile</NavLink>
                            </li>
                            <li onClick={props.userSignOut}>
                                <NavLink to="/logOut">Log Out</NavLink>
                            </li>
                        </>}
                </ul>
            </div>
        </header>
    )
}
export default Header
import React, { useEffect } from 'react'
// import { BsArrowDown } from 'react-icons/bs'
import { useNavigate, useOutletContext } from "react-router-dom"
import './Home.modulus.css';

const Home = (props) => {
    const navigate = useNavigate()

    const authUser = useOutletContext()

    const handleSignInLink = () => {
        navigate("/signIn")
    }

    const handleSignUpLink = () => {
        navigate("/signUp")
    }

    const handleCreateBlogLink = () => {
        navigate("/profile")
    }

    return (
        <section className="home">
            <div className="contain">
                <div className="overlay"></div>
                <div className="content">
                    <div className="text">
                        <span><span>Hello!</span> Welcome to </span>
                        <h1>webGhoul blog</h1>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                    </div>
                    {
                        authUser ? <div className="buttons">
                            <button type='button' onClick={handleCreateBlogLink}>Create your Blog</button>
                        </div> : <div className="buttons">
                            <button type='button' onClick={handleSignUpLink} >Sign Up</button>
                            <button type='button' onClick={handleSignInLink} >Sign In</button>
                        </div>
                    }
                </div>
                {/* <div className="arrow">
                    <BsArrowDown />
                </div> */}
            </div>
        </section>
    )
}

export default Home

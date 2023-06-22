import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import Swal from 'sweetalert2'
import "./SignIn.modulus.css"
import { auth } from "../../../firebase"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import signInImg from "../../../images/signIn.jpg"

const SignIn = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    let googleProvider = new GoogleAuthProvider()

    const signIn = (e) => {
        e.preventDefault()
        if (email.length === 0) {
            Swal.fire({
                title: 'Error!',
                text: "Email is incorrect",
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/")
                console.log(userCredential)
            }).catch(error => {
                if (error.code === "auth/internal-error") {
                    Swal.fire({
                        title: 'Error!',
                        text: "Incorrect Email or Password",
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                } else if (error.code === "auth/wrong-password") {
                    Swal.fire({
                        title: 'Error!',
                        text: "Incorrect Password",
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }

    const signUpWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((userCredential) => {
                console.log(userCredential)
                navigate("/")
            }).catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: "Incorrect Email or Password",
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
                console.log(error)
            })
    }
    return (
        <section className="sign-in">
            <div className="contain">
                <div className="overlay"></div>
                <picture>
                    <div className="overlay"></div>
                    <h1>Sign In</h1>
                    <img src={signInImg} alt="Sign Up" />
                </picture>
                <form onSubmit={signIn}>
                    <h1>Sign In</h1>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="password">
                        <label htmlFor="pass">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="btns">
                        <button type='submit' onClick={signIn}>Sign In</button>
                        <span>Or</span>
                        <button onClick={signUpWithGoogle}>
                            <FcGoogle />
                        </button>
                        <span>Or</span>
                        <button type='button'>
                            <Link to="/SignUp">Register</Link>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default SignIn

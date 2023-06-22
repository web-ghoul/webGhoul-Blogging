import React, { useState, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./SignUp.modulus.css"
import { FcGoogle } from "react-icons/fc"
import Swal from 'sweetalert2'
import { auth } from "../../../firebase"
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import signUpImg from "../../../images/signUp.jpg"
import { database } from "../../../firebase"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [idGender, setIdGender] = useState("")
    const collectionRef = collection(database, 'users')
    const navigate = useNavigate()
    let googleProvider = new GoogleAuthProvider()
    const handleValidData = () => {
        if (email.length === 0) {
            Swal.fire({
                title: 'Error!',
                text: "Please Enter Your Email",
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
        else if (userName.length === 0) {
            Swal.fire({
                title: 'Error!',
                text: "Please Enter Your Username",
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        } else if (idGender.length === 0) {
            Swal.fire({
                title: 'Error!',
                text: "Please Enter Your Gender",
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        } else if (password.length === 0) {
            Swal.fire({
                title: 'Error!',
                text: "Please Enter Your Password",
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        } else {
            return true
        }
        return false
    }

    const signUp = (e) => {
        e.preventDefault()
        if (handleValidData()) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential)
                    addDoc(collectionRef, {
                        email: email,
                        username: userName,
                        id: idGender
                    }).then(() => {
                        console.log("done")
                        Swal.fire({
                            title: 'success!',
                            text: "Your Data is Saved",
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                    }).catch((error) => {
                        console.log(error)
                    })
                    navigate("/")
                }).catch((error) => {
                    if (error.code === "auth/email-already-in-use") {
                        Swal.fire({
                            title: 'Error!',
                            text: "Email is Already Has Account",
                            icon: 'error',
                            confirmButtonText: 'Cool'
                        })
                    } else if (error.code === "auth/weak-password") {
                        Swal.fire({
                            title: 'Error!',
                            text: "Enter Strong Password at least 6 character",
                            icon: 'error',
                            confirmButtonText: 'Cool'
                        })
                    }
                    console.log(error)
                })
        }
    }

    const signUpWithGoogle = (e) => {
        e.preventDefault()
        signInWithPopup(auth, googleProvider)
            .then((userCredential) => {
                addDoc(collectionRef, {
                    email: userCredential.user.email,
                    username: userCredential.user.displayName,
                    photo: userCredential.user.photoURL
                }).then(() => {
                    console.log("done")
                    Swal.fire({
                        title: 'success!',
                        text: "Your Data is Saved",
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }).catch((error) => {
                    console.log(error)
                })
                console.log(userCredential)
                navigate("/")
            }).catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: "Connect With internet",
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
                console.log(error)
            })
    }

    const radioGender = (e) => {
        const id = e.target.parentElement.children[0].id
        setIdGender(id)
        if (!e.target.parentElement.parentElement.children[0].classList.contains(id)) {
            e.target.parentElement.parentElement.children[0].classList.remove('active')
        }
        if (!e.target.parentElement.parentElement.children[1].classList.contains(id)) {
            e.target.parentElement.parentElement.children[1].classList.remove('active')
        }
        e.target.parentElement.classList.toggle('active')
    }
    return (
        <section className="sign-up">
            <div className="contain">
                <div className="overlay"></div>
                <picture>
                    <div className="overlay"></div>
                    <h1>Sign Up</h1>
                    <img src={signUpImg} alt="Sign Up" />
                </picture>
                <form onSubmit={signUp}>
                    <h1>Sign Up</h1>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="username">
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="gender">
                        <label htmlFor="gender">Gender</label>
                        <div className="radio">
                            <div className="male">
                                <input type="radio" id='male' />
                                <label onClick={radioGender} htmlFor="male">Male</label>
                            </div>
                            <div className="female">
                                <input type="radio" id='female' />
                                <label onClick={radioGender} htmlFor="female">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className="password">
                        <label htmlFor="pass">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="btns">
                        <button type='submit' onClick={signUp}>Register</button>
                        <span>Or</span>
                        <button type='button'>
                            <Link to="/SignIn">Sign In</Link>
                        </button>
                    </div>
                    <div className="google">
                        <button onClick={signUpWithGoogle}>
                            <span>Sign Up With </span>
                            <FcGoogle />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default SignUp

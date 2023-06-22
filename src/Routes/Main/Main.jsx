import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from '../../framework.modulus.css';
import { auth } from "../../firebase"
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth'
const Main = () => {
    const navigate = useNavigate()
    const [authUser, setAuthUser] = useState(null)
    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('sign Out Successfully')
            navigate("/")
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })
        return () => {
            listen()
        }
    }, [])
    return (
        <main>
            <div className={styles.container}>
                <Header userSignOut={userSignOut} authUser={authUser} />
                <Outlet context={authUser} />
                {authUser && <Footer />}
            </div>
        </main>
    )
}

export default Main

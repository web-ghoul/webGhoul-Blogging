import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useOutletContext } from "react-router-dom"
import "./Profile.modulus.css"
import Swal from 'sweetalert2'
import maleImg from "../../images/male.png"
import femaleImg from "../../images/female.jpg"
import Blog from "../../components/Blog/Blog"
import { database } from "../../firebase"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"

const Profile = () => {
    const blogText = useRef()
    const authUser = useOutletContext()
    const [blogs, setBlogs] = useState([])
    const collectionRefBlogs = collection(database, 'blogs')
    const collectionRefUsers = collection(database, 'users')
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [photo, setPhoto] = useState("")
    const [idGender, setIdGender] = useState("")

    const submitBlog = async (e) => {
        e.preventDefault()
        addDoc(collectionRefBlogs, {
            email: email,
            blog: blogText.current.value,
            date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            idGender: idGender,
            username: userName,
            photo: photo,
        }).then(() => {
            Swal.fire({
                title: 'Success!',
                text: "Your blog is created Successfully",
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            blogText.current.value = ""
            console.log("Done")
        }).catch((error) => {
            console.log(error)
        })
        getUserBlogs()
    }

    const getUserData = useCallback(() => {
        getDocs(collectionRefUsers)
            .then((response) => {
                response.docs.map((item) => {
                    if (item.data().email.toLowerCase() === authUser.email.toLowerCase()) {
                        setUserName(item.data().username)
                        setEmail(item.data().email)
                        if (item.data().photo) {
                            setPhoto(item.data().photo)
                        } else {
                            setIdGender(item.data().id)
                        }
                    }
                })
            }).catch((error) => {
                console.log(error)
            })
    }, [authUser])

    const getUserBlogs = useCallback(() => {
        getDocs(collectionRefBlogs).then((response) => {
            let allBlogs = []
            response.docs.map((blog) => {
                if (blog.data().email.toLowerCase() === email.toLowerCase()) {
                    allBlogs.push(blog.data())
                }
            })
            setBlogs(allBlogs)
        }).catch((error) => {
            console.log(error)
        })
    }, [collectionRefBlogs])

    useEffect(() => {
        if (authUser) {
            setEmail(authUser.email)
        }
        getUserData()
        getUserBlogs()
    }, [getUserData, getUserBlogs, authUser])

    return (
        <section className="profile">
            <div className="contain">
                <div className="back">
                    <picture>
                        <img src={photo ? photo : (idGender === 'male' ? maleImg : femaleImg)} alt="profile" />
                    </picture>
                </div>
                <div className="info">
                    <h2 className="name">{userName}</h2>
                    <h3 className='email'>{email}</h3>
                </div>
                <div className="create-blog">
                    <h3 className='head'>Create your blog</h3>
                    <form>
                        <textarea ref={blogText} name="create-blog" id="create-blog" placeholder='blogging here....'></textarea>
                        <button onClick={submitBlog} type='submit'>Create</button>
                    </form>
                </div>
                <div className="blogs">
                    <h3 className='head'>Your Blogs</h3>
                    <article>
                        {blogs ?  blogs.sort((a, b) => {
                            const [dayA,monthA,yearA] = a.date.split('/');
                            const [hoursA, minutesA, secondsA] = a.time.split(':');
                            const [dayB,monthB,  yearB] = b.date.split('/');
                            const [hoursB, minutesB, secondsB] = b.time.split(':');
                            const dateA = new Date(+yearA, +monthA - 1, +dayA, +hoursA, +minutesA, +secondsA);
                            const dateB = new Date(+yearB, +monthB - 1, +dayB, +hoursB, +minutesB, +secondsB);
                            return dateB - dateA
                        }).map((blog, i) => {
                            return (
                                <Blog key={i} data={{ img: (photo ? photo : (idGender === 'male' ? maleImg : femaleImg)), info: { name: blog.username, email: blog.email }, quote: blog.blog, duration: { date: blog.date, time: blog.time } }} />
                            )
                        }) : ""}
                    </article>
                </div>
            </div>
        </section>
    )
}

export default Profile

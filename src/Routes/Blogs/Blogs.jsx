import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import Blog from "../../components/Blog/Blog"
import { MdKeyboardArrowRight } from "react-icons/md"
import { Link } from "react-router-dom"
import img1 from "../../images/oldMan.png"
import img2 from "../../images/youngMan.jfif"
import { collection, getDocs } from "firebase/firestore"
import maleImg from "../../images/male.png"
import femaleImg from "../../images/female.jpg"
import { database } from "../../firebase"
import './Blogs.modulus.css'


const Blogs = () => {
    const [blogs, setBlogs] = useState()
    const collectionRefBlogs = collection(database, 'blogs')

    const getUserBlogs = useCallback(() => {
        getDocs(collectionRefBlogs).then((response) => {
            let allBlogs = []
            response.docs.map((blog) => {
                allBlogs.push(blog.data())
            })
            setBlogs(allBlogs)
        }).catch((error) => {
            console.log(error)
        })
    }, [collectionRefBlogs])

    useEffect(() => {
        getUserBlogs()
    }, [])
    return (
        <>
            <section className="title">
                <div className="contain">
                    <div className="overlay"></div>
                    <div className="content">
                        <h1>All Blogs</h1>
                        <h5>
                            <Link to="/">Home</Link>
                            <MdKeyboardArrowRight />
                            <p>Blogs</p>
                        </h5>
                    </div>
                </div>
            </section>
            <section className="blogs">
                <div className="contain">
                    {
                        blogs ? blogs.sort((a, b) => {
                            const [dayA,monthA,yearA] = a.date.split('/');
                            const [hoursA, minutesA, secondsA] = a.time.split(':');
                            const [dayB,monthB,  yearB] = b.date.split('/');
                            const [hoursB, minutesB, secondsB] = b.time.split(':');
                            const dateA = new Date(+yearA, +monthA - 1, +dayA, +hoursA, +minutesA, +secondsA);
                            const dateB = new Date(+yearB, +monthB - 1, +dayB, +hoursB, +minutesB, +secondsB);
                            return dateB - dateA
                        }).map((blog, i) => (
                            <Blog key={i} data={{ img: (blog.photo ? blog.photo : (blog.idGender === 'male' ? maleImg : femaleImg)), info: { name: blog.username, email: blog.email }, quote: blog.blog, duration: { date: blog.date, time: blog.time } }} />
                        )) : (<h3> No Blogs Found </h3>)
                    }
                </div>
            </section>
        </>
    )
}

export default Blogs
import React from 'react'
import "./Blog.modulus.css"

const Blog = (props) => {
    return (
        <article className="blog" key={props.key ? props.key : 1}>
            <div className="data">
                <picture>
                    <img src={props.data.img} alt="" />
                </picture>
                <div className="info">
                    <h3>{props.data.info.name}</h3>
                    <p>{props.data.info.email}</p>
                </div>
            </div>
            <q>{props.data.quote}</q>
            <div className="duration">
                <div className="date">Date : <span>{props.data.duration.date}</span></div>
                <div className="time">Time : <span>{props.data.duration.time}</span></div>
            </div>
        </article>
    )
}

export default Blog

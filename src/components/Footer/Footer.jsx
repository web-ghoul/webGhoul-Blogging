import React from 'react'
import './Footer.modulus.css';
import { ImTwitter, ImFacebook } from "react-icons/im"
import { BsInstagram } from "react-icons/bs"
import { NavLink } from 'react-router-dom';
import { GoLocation } from "react-icons/go"
import { FiPhoneCall, FiMail, FiChevronRight, } from "react-icons/fi"
import carImg from "../../images/car.jpg"

const Footer = () => {
    return (
        <footer>
            <div className="contain">
                <div className="parts">
                    <div className="part">
                        <div className="logo">
                            web<span>Ghoul</span>.
                        </div>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                        <div className="icons">
                            <i>
                                <ImTwitter />
                            </i>
                            <i>
                                <ImFacebook />
                            </i>
                            <i>
                                <BsInstagram />
                            </i>
                        </div>
                    </div>

                    <div className="part">
                        <div className="head">Latest Blogs</div>
                        <div className="blogs">
                            <div className="blog">
                                <picture>
                                    <img src={carImg} alt="carImg" />
                                </picture>
                                <div className="content">
                                    <p>Even the all-powerful Pointing has no control about</p>
                                    <div className="date">Oct. 16 , 2019</div>
                                </div>
                            </div>
                            <div className="blog">
                                <picture>
                                    <img src={carImg} alt="carImg" />
                                </picture>
                                <div className="content">
                                    <p>Even the all-powerful Pointing has no control about</p>
                                    <div className="date">Oct. 16 , 2019</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="part">
                        <div className="head">Information</div>
                        <ul className="lists">
                            <li>
                                <i>
                                    <FiChevronRight />
                                </i>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <i>
                                    <FiChevronRight />
                                </i>
                                <NavLink to="/blogs">Blogs</NavLink>
                            </li>
                            <li>
                                <i>
                                    <FiChevronRight />
                                </i>
                                <NavLink to="/profile">Profile</NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="part">
                        <div className="head">Have a Questions?</div>
                        <div className="questions">
                            <div className="ques">
                                <i>
                                    <GoLocation />
                                </i>
                                <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
                            </div>
                            <div className="ques">
                                <i>
                                    <FiPhoneCall />
                                </i>
                                <p>+2 392 3929 210</p>
                            </div>
                            <div className="ques">
                                <i>
                                    <FiMail />
                                </i>
                                <p>	info@yourdomain.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copy">
                    Copyright ©2023 All rights reserved | This template is made with
                    ❤️
                    by webGhoul
                </div>
            </div>
        </footer>
    )
}
export default Footer
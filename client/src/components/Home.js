import React from 'react'
import About from './About';
import Header from './Header';
// import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <Header />
            <div className="nav-comment">
                <div className="nav">
                    <div className="nav__text">PLAY&nbsp;&nbsp;<i className="far fa-hand-point-right  nav__text-icon"></i></div>
                    <div className="nav__image"></div>
                </div>
                <About />
            </div>
            <div className="main-comment">
                <div className="main-comment__wrapper">
                    <div className="main-comment__top">
                        <p className="main-comment__name">NAME</p>
                        <p className="main-comment__time">TIME</p>
                    </div>
                    <div className="main-comment__bottom">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Doloribus repellat nulla deserunt, vitae eos aliquid facilis 
                        cupiditate iste, delectus quasi corrupti quaerat in.
                    </div>
                </div>
                <div className="main-comment__wrapper">
                    <div className="main-comment__top">
                        <p className="main-comment__name">NAME</p>
                        <p className="main-comment__time">TIME</p>
                    </div>
                    <div className="main-comment__bottom">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Doloribus repellat nulla deserunt, vitae eos aliquid facilis 
                        cupiditate iste, delectus quasi corrupti quaerat in.
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home

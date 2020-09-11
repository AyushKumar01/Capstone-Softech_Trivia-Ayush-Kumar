import React from 'react'
import logo from '../assets/images/logohit.png';

function About() {
    return (
        <div className="main-about">
            <div className="main-about__logo">
            <div className="main-about__logo-image"></div>
            <img className="main-about__icon" src={logo} alt="logo" />
            </div>
            <div  className="main-about__descriptions">
                <p className="main-about__descriptions-text">Your brain is your most valuable tool — 
                    you use it every day to solve problems, 
                    make decisions, and navigate our complex world. 
                    But how well do you really know your own mind? 
                    And what kind of thinker are you?<br></br>
                    Let's play !
                </p>
            </div>
        </div>
    )
}

export default About

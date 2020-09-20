import React from 'react';
import { Link } from 'react-router-dom';
import LogOutBtn from './LogOutBtn';

function Header() {
    let username = "";
    if (localStorage.getItem('username')) {
        username = localStorage.getItem('username');
    }
    return (
        <header className="header">
        <div className="header__wrapper">
            <div>
                <p className="header__username">{username}</p>
                <LogOutBtn text="Log Out" className="header__logout-btn"/>
            </div>
            <nav className="header__nav">
                <ul className="header__list">
                    <li className="header__list-item"><Link className="header__list-link" to="/home">Home</Link></li>
                    <li className="header__list-item"><Link className="header__list-link" to="/comment">Comment</Link></li>
                </ul>
            </nav>
        </div>
        </header>
    )
}

export default Header;

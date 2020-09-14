import React from 'react';
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
                    <li className="header__list-item"><a className="header__list-link" href="/home">Home</a></li>
                    <li className="header__list-item"><a className="header__list-link" href="/about">About</a></li>
                    <li className="header__list-item"><a className="header__list-link" href="/comment">Comment</a></li>
                </ul>
            </nav>
        </div>
        </header>
    )
}

export default Header;

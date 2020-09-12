import React from 'react';
import LogOutBtn from './LogOutBtn';
function Header() {
    return (
        <header className="header">
        <div className="header__wrapper">
            <div>
                <p className="header__username">username</p>
                <LogOutBtn text="Log Out" className="header__logout-btn"/>
            </div>
            <nav className="header__nav">
                <ul className="header__list">
                    <li className="header__list-item"><a className="header__list-link">Home</a></li>
                    <li className="header__list-item"><a className="header__list-link">About</a></li>
                    <li className="header__list-item"><a className="header__list-link">Comment</a></li>
                </ul>
            </nav>
        </div>
        </header>
    )
}

export default Header;

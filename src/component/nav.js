import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logo.png';

function Nav() {
    const navStyle = {
        color: 'white',
        textDecoration: 'none'
    };
    return (
        <nav className="ml-auto">
            <img src={logo} alt="logo" className="rounded-circle" width="60" height="60" />
            <ul className="nav-links">
                <Link style={navStyle} to="/">
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to="/Quiz">
                    <li>Quiz</li>
                </Link>
                <Link style={navStyle} to="/Cards">
                    <li>Cards</li>
                </Link>
                <a style={navStyle} href="http://sharon.bdxonline.com:5000/">
                    <li>UploadWords</li>
                </a>

            </ul>
        </nav>

    )
}

export default Nav;
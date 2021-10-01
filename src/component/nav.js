import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Nav() {
    const navStyle = {
        color: 'white'
    };
    return (
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                <Link style={navStyle} to="/Home">
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to="/Quiz">
                    <li>Quiz</li>
                </Link>
                <Link style={navStyle} to="/Cards">
                    <li>Cards</li>
                </Link>
            </ul>
        </nav>

    )
}

export default Nav;
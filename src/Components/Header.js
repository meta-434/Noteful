import React from 'react';
import './Header.css'
import { NavLink } from 'react-router-dom';

export default function Header() {
    return(
        <header>
            <NavLink to="/" >
                <h1>Noteful</h1>
            </NavLink>
        </header>
    )
}
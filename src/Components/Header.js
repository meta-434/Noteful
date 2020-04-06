import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return(
        <header>
            <NavLink to="/">
                <h1>Noteful</h1>
            </NavLink>
        </header>
    )
}
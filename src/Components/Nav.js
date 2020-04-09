import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './Nav.css';

export default class Nav extends Component {
    render() {
        return (
            <NotefulContext.Consumer>
                {({ folders }) => {
                    return (
                        <nav className="navigation">
                            <section className="add-content">
                                <NavLink to={'/add-folder'} style={{textDecoration: 'none'}}>
                                    <div>Add Folder</div>
                                </NavLink>
                                <NavLink to={'/add-note'} style={{textDecoration: 'none'}}>
                                    <div>Add Note</div>
                                </NavLink>
                            </section>
                            <section className="folder-list">
                                <h3>Folders:</h3>
                                {folders.map((folder, index) => {
                                    return (
                                        <NavLink to={`/folders/${folder.id}`}
                                                 key={index}
                                                 style={{textDecoration: 'none'}}>
                                            <p>{folder.name}</p>
                                        </NavLink>
                                    )
                                })}
                            </section>
                        </nav>
                    )
                }}
            </NotefulContext.Consumer>
        )
    }
}
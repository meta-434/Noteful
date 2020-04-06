import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

export default class Nav extends Component {
    render() {
        return (
            <NotefulContext.Consumer>
                {({ folders }) => {
                    return (
                        <nav className="navigation">
                            <section className="add-content">
                                <NavLink to={'/add-folder'}>
                                    <ul><li>Add Folder</li></ul>
                                </NavLink>
                                <NavLink to={'/add-note'}>
                                    <ul><li>Add Note</li></ul>
                                </NavLink>
                            </section>
                            <section className="folder-list">
                                <h3>Your Folders:</h3>
                                {folders.map((folder, index) => {
                                    return (
                                        <NavLink key={index} to={`/folders/${folder.id}`}>
                                            <ul><li>{folder.name}</li></ul>
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
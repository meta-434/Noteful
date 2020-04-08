import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import DeleteButton from './DeleteButton';
import './Main.css';

export default class Main extends Component {
    static contextType = NotefulContext;
    // component's whole job is to render all the notes, unfiltered.
    render() {
        return (
            <NotefulContext.Consumer>
                {({ notes }) => {
                    return notes.map((note, index) => {
                        return (
                            <section className="notes-display" key={index}>
                                <Link to={`/notes/${note.id}`} style={{textDecoration: 'none'}}>
                                    <h3>{note.name}</h3>
                                    <p>{note.modified}</p>
                                </Link>
                                <DeleteButton note={note} />
                            </section>
                        );
                    });
                }}
            </NotefulContext.Consumer>
        );
    }
}
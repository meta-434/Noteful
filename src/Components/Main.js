import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import DeleteButton from './DeleteButton';

export default class Main extends Component {
    static contextType = NotefulContext;

    render() {
        return (
            <NotefulContext.Consumer>
                {({ notes }) => {
                    return notes.map((note, index) => {
                        return (
                            <section className="notes-display" key={index}>
                                <Link to={`/notes/${note.id}`}>
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
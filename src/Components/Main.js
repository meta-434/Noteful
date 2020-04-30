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
                {({ notes, folders }) => {
                    return notes.map((note, index) => {
                        const filteredFolder = folders.filter(folder => folder.id === note.assigned_folder)[0];
                        return (
                            <section className="notes-display" key={index}>
                                <Link to={`/notes/${note.id}`}>
                                    <h2>{note.note_name}</h2>
                                    <h3>↳ {filteredFolder.folder_name}</h3>
                                    <p>{note.date_modified}</p>
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
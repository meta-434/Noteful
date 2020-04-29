import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import NotefulContext from '../NotefulContext';
import ReactRouterPropTypes from 'react-router-prop-types';

import './Folder.css';

export default class Folder extends Component {
    static contextType = NotefulContext;

    render() {
        const {notes} = this.context;
        if (notes.length > 0) {
            return (
                <NotefulContext.Consumer>
                    {({ notes }) => {
                        console.log('folder\'s notes', notes);
                        const filteredNotes = notes.filter(note => note.assigned_folder === this.props.match.params.folder_id);
                        return filteredNotes
                            .map(fNote => {
                                return (
                                    <section className="notes-display" key={fNote.id}>
                                        <Link to={`/notes/${fNote.id}`} style={{textDecoration: 'none'}}>
                                            <h3>{fNote.note_name}</h3>
                                            <p>{fNote.date_modified}</p>
                                        </Link>
                                        <DeleteButton note={fNote} />
                                    </section>
                                );
                            });
                    }}
                </NotefulContext.Consumer>
            );
        } else {
            return (<p>...no notes found...</p>)
        }
    }
};

Folder.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};

Folder.defaultProps = {
    match: "",
};




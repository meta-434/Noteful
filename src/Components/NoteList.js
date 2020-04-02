import React from 'react';
import {Link} from 'react-router-dom';
import './NoteList.css';
import NotefulContext from "../NotefulContext";

export default class NoteList extends React.Component {
    static contextType = NotefulContext;

    render() {
        const folderId = this.props.folderId;
        const { notes } = this.context || 'HELP';
        const filteredNotes = (folderId) ? notes.filter(note => note.folderId === folderId) : notes;
        console.log('filteredNotes', filteredNotes, 'folderId', folderId, 'notes', notes);

        return filteredNotes.map(fNote => {
            return (
                <Link
                    to={`/note/${fNote.id}`}
                    className="notelist"
                    id={fNote.id}
                >
                    <div>
                        <h3>
                            {fNote.name}
                        </h3>
                        <p>
                            {`Modified ${fNote.modified}`}
                        </p>
                    </div>
                </Link>
            );
        });
    }
}
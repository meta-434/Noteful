import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import DeleteButton from './DeleteButton';
import ReactRouterPropTypes from 'react-router-prop-types';

export default class NoteList extends Component {
    static contextType = NotefulContext;

    render() {
        return (
            <NotefulContext.Consumer>
                {({ notes }) => {
                    const iNote = notes.filter(iNote => iNote.id === this.props.match.params.note_id);
                    console.log('iNote: ', iNote);
                    return iNote.map(iNote => {
                        return(
                            <div className="iNote" key={iNote.id}>
                                <h3>{iNote.note_name}</h3>
                                <p>{iNote.note_content}</p>
                                <p>Modified: {iNote.date_modified}</p>
                                <DeleteButton note={iNote} />
                            </div>
                        )
                    });
                }}
            </NotefulContext.Consumer>
        );
    }
};

NoteList.propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
};

NoteList.defaultProps = {
    match: "",
};
import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import DeleteButton from './DeleteButton';

export default class Main extends Component {
    static contextType = NotefulContext;

    render() {
        console.log('here', this.props);
        return (
            <NotefulContext.Consumer>
                {({ notes }) => {
                    const iNote = notes.filter(iNote => iNote.id === this.props.match.params.note_id);
                    console.log('iNote: ', iNote);
                    return iNote.map(iNote => {
                        return(
                            <div className="iNote" key={iNote.id}>
                                <h3>{iNote.name}</h3>
                                <p>{iNote.content}</p>
                                <p>Modified: {iNote.modified}</p>
                                <DeleteButton note={iNote} />
                            </div>
                        )
                    });
                }}
            </NotefulContext.Consumer>
        );
    }
}
import React from "react";
import NotefulContext from "../NotefulContext";

export default class Note extends React.Component{
    static contextType = NotefulContext;

    render() {
        const { notes } = this.context;
        const res = notes.filter(iNote => iNote.id === this.props.noteId);
        console.log(res[0]);

        return (
            <div>
                <div>
                    <h3>
                        {(res[0]) ? (res[0].name) : ('name')}
                    </h3>
                    <p>
                        {(res[0]) ? (`Modified ${res[0].modified}`) : ('modified...')}
                    </p>
                </div>
                <p>{(res[0]) ? (res[0].content) : ('content...')}</p>
            </div>
        );
    }
}
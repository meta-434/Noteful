import React from 'react';
import Header from "./Header";
import Sidebar from "./Sidebar";
import NotefulContext from "../NotefulContext";
import NoteList from "./NoteList";
import Note from "./Note";

export default class ComponentComposer extends React.Component {
    static contextType = NotefulContext;

    render() {
        const { selectFolder, folders, notes} = this.context;
        const folderId = this.props.match.params.folderId;


        function getNotes () {
            const filteredNotes = (folderId) ? notes.filter(note => note.folderId === folderId) : notes;
            return filteredNotes.map(note => <NoteList note={note}/>);
        }



        return(
            <>
                <Header />
                <Sidebar
                    folders={folders}
                    selectFolder={(e) => selectFolder(e)}
                    activeFolder={folderId}
                    goBack={false}
                />
                <NoteList />
            </>
        )
    }
}
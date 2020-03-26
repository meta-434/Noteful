import React from 'react';
import { Route } from 'react-router-dom';
import STORE from './STORE';
import './App.css';
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import NoteList from "./Components/NoteList";
import Note from "./Components/Note";
import ComponentComposer from './Components/ComponentComposer'
import NotefulContext from "./NotefulContext";

class App extends React.Component {
    state = {
        notes: [],
        folders: [],
        activeFolder: null,
    };

    componentDidMount = () => {
        this.setState({notes: STORE.notes, folders: STORE.folders});
    };

    selectFolder = (e) => {
        this.setState({activeFolder: e.target.id})
    };

    clearSelectedFolder = () => {
        this.setState({activeFolder: null});
    };

    getNotes = () => (this.state.activeFolder) ? this.state.notes.filter(note => note.folderId === this.state.activeFolder) : this.state.notes;

    filterNotes = (activeFolder) => {
        if (activeFolder) {
            const filteredNotes = this.state.notes.filter(note => note.folderId === activeFolder);
            return filteredNotes.map(fNote => {
                    return(
                        <NoteList
                            {...fNote}
                            key={fNote.id}
                        />
                    );
                }
            );
        } else {
            return this.state.notes.map(Note => {
                return(
                    <NoteList
                        {...Note}
                        key={Note.id}
                    />
                )
            })
        }
    };


    render() {
        const { notes, folders, activeFolder } = this.state;
        return (
        <NotefulContext.Provider
            value={{
                notes,
                folders,
                selectFolder: this.selectFolder,
                getNotes: this.getNotes,
                activeFolder,
            }}
        >
            <>
                <Route
                    exact
                    path={"/"}
                    component={ComponentComposer}
                />
                <Route
                    exact
                    path={"/folder/:folderId"}
                    component={ComponentComposer}
                />
                <Route
                    exact
                    path={"/note/:noteId"}
                    component={ComponentComposer}
                />
                {/*<Route*/}
                {/*    exact*/}
                {/*    path={"/folder/:folderId"}*/}
                {/*    render={(routeProps)=> <>*/}
                {/*        <Header*/}
                {/*            clearSelectedFolder={this.clearSelectedFolder}*/}
                {/*        />*/}
                {/*        <Sidebar*/}
                {/*            {...routeProps}*/}
                {/*            folders={this.state.folders}*/}
                {/*            selectFolder={(e) => this.selectFolder(e)}*/}
                {/*            activeFolder={this.state.folders.find(folder => folder.id === routeProps.match.params.folderId)}*/}
                {/*        />*/}
                {/*        {this.filterNotes(this.state.activeFolder)}*/}
                {/*    </>}*/}
                {/*/>*/}
                {/*<Route*/}
                {/*    exact*/}
                {/*    path={"/note/:noteId"}*/}
                {/*    render={(routeProps) => <>*/}
                {/*       <Header*/}
                {/*        clearSelectedFolder={this.clearSelectedFolder}*/}
                {/*       />*/}
                {/*       <Sidebar*/}
                {/*           {...routeProps}*/}
                {/*           folders={this.state.folders}*/}
                {/*           selectFolder={(e)=>this.selectFolder(e)}*/}
                {/*           activeFolder={this.state.activeFolder}*/}
                {/*           goBack={true}*/}
                {/*       />*/}
                {/*       <Note*/}
                {/*           {...this.state.notes.find(note => note.id === routeProps.match.params.noteId)}*/}
                {/*       />*/}
                {/*    </>}*/}
                {/*/>*/}
            </>
        </NotefulContext.Provider >
        );
    }
}

export default App;

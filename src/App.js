import React from 'react';
import { Route } from 'react-router-dom';
import STORE from './STORE';
import './App.css';
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import NoteList from "./Components/NoteList";
import Note from "./Components/Note";

class App extends React.Component {
    state = {
        notes: [],
        folders: [],
        activeFolder: null
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

    filterNotes = (activeFolder) => {
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
    };

    render() {
        return (
            <>
                <Route
                    exact
                    path={"/"}
                    render={(routeProps)=> <>
                        <Header
                            clearSelectedFolder={this.clearSelectedFolder}
                        />
                        <Sidebar
                            {...routeProps}
                            folders={this.state.folders}
                            selectFolder={(e) => this.selectFolder(e)}
                            activeFolder={this.state.activeFolder}
                        />
                    </>}
                />
                <Route
                    exact
                    path={"/folder/:folderId"}
                    render={(routeProps)=> <>
                        <Header
                            clearSelectedFolder={this.clearSelectedFolder}
                        />
                        <Sidebar
                            {...routeProps}
                            folders={this.state.folders}
                            selectFolder={(e) => this.selectFolder(e)}
                            activeFolder={this.state.activeFolder}
                        />
                        {this.filterNotes(this.state.activeFolder)}
                    </>}
                />
                <Route
                    exact
                    path={"/note/:noteId"}
                    render={(routeProps) => <>
                       <Header
                        clearSelectedFolder={this.clearSelectedFolder}
                       />
                       <Sidebar
                           {...routeProps}
                           folders={this.state.folders}
                           selectFolder={(e)=>this.selectFolder(e)}
                           activeFolder={this.state.activeFolder}
                           goBack={true}
                       />
                       <Note
                           {...this.state.notes.find(note => note.id === routeProps.match.params.noteId)}
                       />
                    </>}
                />
            </>
        );
    }
}

export default App;

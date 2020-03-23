import React from 'react';
import { Route, Link } from 'react-router-dom';
import STORE from './STORE';
import './App.css';
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import NoteList from "./Components/NoteList";
import RouteTestFolder from "./Components/RouteTestFolder";

class App extends React.Component {
    state = {
        notes: [],
        folders: [],
        activeFolder: null
    };

    /* TODO */
    /* need: main route (/) with all notes + sidebar */
    /* need: folder route (/folder/[folder-id], filters notes, shows selected folder*/
    /* need: note route (/note/[note-id], displays only selected note. sidebar shows current folder + back button.*/
    componentDidMount = () => {
        this.setState({notes: STORE.notes, folders: STORE.folders});
    };

    selectFolder = (e) => {
        console.log('selected folder id:', e.target.id);
        this.setState({activeFolder: e.target.id})
    };

    clearSelectedFolder = () => {
        this.setState({activeFolder: null});
    };

    filterNotes = (activeFolder) => {
        const filteredNotes = this.state.notes.filter(note => note.folderId === activeFolder);
        console.log('filteredNotes', filteredNotes);
        return filteredNotes.map(fNote => {
            return(
                    <NoteList
                        {...fNote}
                    />
                );
            }
        );
    };

    render() {
        console.log('state @ render', this.state);
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
                       />

                    </>}
                />
            </>
        );
    }
}

export default App;

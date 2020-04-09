import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Nav from "./Components/Nav";
import Main from "./Components/Main";
import Folder from "./Components/Folder";
import AddFolder from "./Components/AddFolder";
import AddNote from "./Components/AddNote";
import NoteList from "./Components/NoteList";
import ItemViewErrorBoundary from "./ItemViewErrorBoundary";
import ItemAddErrorBoundary from "./ItemAddErrorBoundary";
import NavErrorBoundary from "./NavErrorBoundary";
import NotefulContext from "./NotefulContext";

class App extends Component {
    state = {
        folders: [],
        notes: []
    };

    componentDidMount() {
        fetch('http://localhost:9090/folders')
            .then(response => response.json())
            .then(responseJson =>
                this.setState({
                    folders: responseJson
                })
            )
            .catch(error => console.error(error));

        fetch('http://localhost:9090/notes')
            .then(response => response.json())
            .then(responseJson =>
                this.setState({
                    notes: responseJson
                })
            )
            .catch(error => console.error(error));

    };

    handleDeleteFetch = (noteId) => {
        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(() => this.handleDelete(noteId))
            .catch(error => console.error(error))
    };

    handleDelete = (id) => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== id)
        });
    };

    handlePostFolder = (folderName) => {
        fetch('http://localhost:9090/folders', {
            method: 'POST',
            body: JSON.stringify({
                name: folderName
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(r => console.log('folder post confirmation', r))
            .catch(error => console.error(error));
    };

    handlePostNote = ({ name, folderId, content }) => {
        fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                modified: new Date(),
                name,
                folderId,
                content
            })
        })
            .then(r => console.log('note post confirmation: ', r))
            .catch(error => console.error(error));
    };

    render() {
        const { folders, notes } = this.state;
        const context = {
            folders,
            notes,
            handleDeleteFetch: this.handleDeleteFetch,
            handleDelete: this.handleDelete,
            handlePostFolder: this.handlePostFolder,
            handlePostNote: this.handlePostNote
        };
        return (
            <NotefulContext.Provider value={(context)}>
                <div className="App">
                    <Route component={Header} />
                    <NavErrorBoundary>
                        <Route component={Nav} />
                    </NavErrorBoundary>
                    <main className="app-content">
                        <Route exact path="/" component={Main} />
                        <ItemViewErrorBoundary>
                            <Route path="/folders/:folder_id" component={Folder} />
                            <Route path="/notes/:note_id" render={routeProps => <NoteList {...routeProps} />} />
                        </ItemViewErrorBoundary>
                        <ItemAddErrorBoundary>
                            <Route exact path="/add-folder" component={AddFolder} />
                            <Route exact path="/add-note" component={AddNote} />
                        </ItemAddErrorBoundary>
                    </main>
                </div>
            </NotefulContext.Provider>
        )
    }
}

export default App;

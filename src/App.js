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
        this.handleGetFetch();
    };

    handleGetFetch = () => {
        fetch('http://localhost:8000/folders')
            .then(response => response.json())
            .then(responseJson =>
                this.setState({
                    folders: responseJson
                })
            )
            .catch(error => console.error(error));

        fetch('http://localhost:8000/notes')
            .then(response => response.json())
            .then(responseJson =>
                this.setState({
                    notes: responseJson
                })
            )
            .catch(error => console.error(error));
    }

    handleDeleteFetch = (noteId) => {
        fetch(`http://localhost:8000/notes/${noteId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    const newNotes = this.state.notes.filter(note => note.id !== noteId);
                    this.setState({
                        notes: newNotes
                    });
                    this.props.history.push('/');
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
        fetch('http://localhost:8000/folders', {
            method: 'POST',
            body: JSON.stringify({
                folder_name: folderName
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .catch(error => console.error(error));
    };

    handlePostNote = ({ name, folderId, content }) => {
        fetch(`http://localhost:8000/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date_modified: new Date(),
                note_name: name,
                assigned_folder: folderId,
                note_content: content
            })
        })
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

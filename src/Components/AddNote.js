import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';

export default class AddNote extends Component {
    static contextType = NotefulContext;

    state = {
        name: '',
        folderId: '',
        content: '',
        nameValid: false,
        contentValid: false,
        nameValidation: '',
        contentValidation: ''
    };

    handlePostSubmit = () => {
        this.context.handlePostNote(this.state);
    };

    handleNoteName = (e) => {
        let nameInput = e.target.value;
        this.setState({ name: nameInput }, (nameInput) => this.validateName(nameInput))
    };

    handleNoteContent = (e) => {
        let contentInput = e.target.value;
        this.setState({ content: contentInput }, (contentInput) => this.validateContent(contentInput))
    };

    handleFolderId = (e) => {
        let folderId = e.target.value;
        this.setState({ folderId })
    };

    validateName(name) {
        let validationMessages = this.state.nameValidation;
        let hasError = false;

        if (name.length === 0) {
            hasError = true;
            validationMessages = ' name cannot be blank. '
        }

        else {
            validationMessages = '';
        }

        this.setState({
            nameValid: !hasError,
            nameValidation: validationMessages,
        }, (name) =>this.nameValid(name));
    }

    validateContent(content) {
        let validationMessages = this.state.contentValidation;
        let hasError = false;

        if (content.length === 0) {
            hasError = true;
            validationMessages = ' Note cannot be blank. '
        }

        else {
            validationMessages = '';
        }

        this.setState({
            contentValid: !hasError,
            contentValidation: validationMessages,
        }, (content) => this.contentValid(content));
    }

    nameValid(name) {
        if (this.state.name) {
            this.setState({name: name})
        }
    }

    contentValid(content) {
        if (this.state.content) {
            this.setState({content})
        }
    }

    render() {
        let folderList = this.context.folders.map(folder => {
            return folder.name
        });

        let folderIds = this.context.folders.map(folder => {
            return folder.id
        });

        return (
            <main className="notes-display">
                <form
                    className="react-form"
                    onSubmit={this.handlePostSubmit}>
                    <label htmlFor="note-name">name: </label>
                    <input
                        type="text"
                        id="note-name"
                        name="note-name"
                        className="note-name"
                        onChange={this.handleNoteName} />
                    <label htmlFor="note-content">Content: </label>
                    <textarea
                        id="note-content"
                        name="note-content"
                        className="note-content"
                        onChange={this.handleNoteContent} />
                    <label htmlFor="note-folder">Folder: </label>
                    <select
                        id="note-folder"
                        className="note-folder"
                        aria-label="Select Folder from Options"
                        aria-required="true"
                        aria-describedby="error-box"
                        onChange={this.handleFolderId}>
                        {<option key="0" value="0">Please select a folder...</option>}
                        {folderList.map((name, id) => {
                            return <option key={folderIds[id]} value={folderIds[id]}>{name}</option>
                        })}
                    </select>
                    <button
                        className="submit-button"
                        type="submit"
                        disabled={!this.state.nameValid || !this.state.contentValid}>
                        Submit
                    </button>
                    <section className="error-box" id="error-box" aria-live="assertive">
                        {this.state.nameValidation}
                        {this.state.contentValidation}
                    </section>
                </form>
            </main>
        )
    }
}
import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';

export default class AddNote extends Component {
    static contextType = NotefulContext;

    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            folderId: undefined,
            content: undefined,
            nameValid: false,
            contentValid: false,
            folderIdValid: false,
            nameValidation: '',
            contentValidation: '',
            folderIdValidation: '',
        };
    }

    componentDidMount() {
        this.validateFolderId(this.state.folderId);
        this.validateName(this.state.name);
        this.validateContent(this.state.content);
    }

    handlePostSubmit = () => {
        this.context.handlePostNote(this.state);
    };

    handleNoteName = (e) => {
        let nameInput = e.target.value;
        this.setState({ name: nameInput }, () => this.validateName(nameInput))
    };

    handleNoteContent = (e) => {
        let contentInput = e.target.value;
        this.setState({ content: contentInput }, () => this.validateContent(contentInput))
    };

    handleFolderId = (e) => {
        let folderId = e.target.value;
        console.log('folderId', folderId)
        this.setState({ folderId }, () => this.validateFolderId(folderId))
    };

    validateFolderId(folderId) {
        let validationMessages;
        let hasError = false;

        if (folderId === '0' || folderId === undefined) {
            hasError = true;
            validationMessages = ' please select a folder ';
        }
        else {
            validationMessages = '';
        }

        this.setState({
            folderIdValid: !hasError,
            folderIdValidation: validationMessages
        }, () => this.folderIdValid(folderId));
    };

    validateName(name) {
        let validationMessages;
        let hasError = false;

        if (!name) {
            hasError = true;
            validationMessages = ' name cannot be blank. '
        }
        else {
            validationMessages = '';
        }

        this.setState({
            nameValid: !hasError,
            nameValidation: validationMessages,
        }, () =>this.nameValid(name));
    };

    validateContent(content) {
        let validationMessages;
        let hasError = false;

        if (!content) {
            hasError = true;
            validationMessages = ' Note cannot be blank. '
        }

        else {
            validationMessages = '';
        }

        this.setState({
            contentValid: !hasError,
            contentValidation: validationMessages,
        }, () => this.contentValid(content));
    };

    nameValid(name) {
        if (this.state.name) {
            this.setState({name: name})
        }
    };

    contentValid(content) {
        if (this.state.content) {
            this.setState({content})
        }
    };

    folderIdValid(folderId) {
        if (this.state.folderId) {
            this.setState({folderId})
        }
    };

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
                    <label htmlFor="note-name">note name: </label>
                    <input
                        type="text"
                        id="note-name"
                        name="note-name"
                        className="note-name"
                        onChange={this.handleNoteName}
                        defaultValue={'enter note name'}
                        aria-label="note name"
                        aria-required="true"
                        aria-describedby="error-box"
                    />
                    <label htmlFor="note-content">note content: </label>
                    <textarea
                        type="text"
                        id="note-content"
                        name="note-content"
                        className="note-content"
                        onChange={this.handleNoteContent}
                        defaultValue={'enter note content'}
                        aria-label="note content"
                        aria-required="true"
                        aria-describedby="error-box"
                    />
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
                        disabled={!this.state.nameValid || !this.state.contentValid || !this.state.folderIdValid}>
                        Submit
                    </button>
                    <section className="error-box" id="error-box" aria-live="assertive">
                        {this.state.nameValidation}
                        <br />
                        {this.state.contentValidation}
                        <br />
                        {this.state.folderIdValidation}
                    </section>
                </form>
            </main>
        )
    }
}
import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import './AddFolder.css';

export default class AddFolder extends Component {
    static contextType = NotefulContext;

    constructor() {
        super();
        this.state = {
            folderName: undefined,
            nameValid: false,
            validation: ''
        };

        this.folderName = React.createRef();
    }


    componentDidMount() {
        this.validateFolder(this.state.folderName);
    }

    handlePostSubmit = () => {
        this.context.handlePostFolder(this.state.folderName);
    };

    handleFolderName = (e) => {
        let folderInput = e.target.value;
        this.setState({ folderName: folderInput },() => this.validateFolder(folderInput))
    };

    validateFolder = (name) => {
        let validationMessages;
        let hasError = false;

        const checkExistingFolders = this.context.folders.filter(folderName => name === folderName.name);

        if (!name) {
            hasError = true;
            validationMessages = 'Please enter a folder name.';
        } else if (checkExistingFolders.length !== 0) {
            hasError = true;
            validationMessages = 'Oops! Folder name already exists.';
        } else {
            validationMessages = '';
        }

        this.setState({
            nameValid: !hasError,
            validation: validationMessages,
        }, () => this.formValid(name));
    };

    formValid = (name) => {
        if (this.state.nameValid) {
            this.setState({folderName: name}, () => {
                if (!this.state.nameValid) {
                    this.folderName.current.focus();
                }
            } )
        }
    };

    render() {
        return (
            <main className="notes-display">
                <form
                    className="react-form"
                    onSubmit={this.handlePostSubmit}>
                    <label htmlFor="folder-name">Folder Name: </label>
                    <input
                        type="text"
                        id="folder-name"
                        name="folder-name"
                        className="folder-name"
                        defaultValue="Folder Name"
                        onChange={ this.handleFolderName}
                        aria-label="new folder name"
                        aria-required="true"
                        aria-describedby="error-box"
                        aria-invalid={!this.state.nameValid}
                    />
                    <button
                        className="submit-button"
                        type="submit"
                        disabled={!this.state.nameValid}>
                        Submit
                    </button>
                    <section className="error-box" id="error-box">
                        {this.state.validation}
                    </section>
                </form>
            </main>
        )
    }
}
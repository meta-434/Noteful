import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import './DeleteButton.css';

export default class DeleteButton extends Component {
    static contextType = NotefulContext;
    render() {
        let noteId = this.props.note.id;
        console.log(noteId);
        return(
            <Link to="/">
                <button
                    type="image"
                    aria-label="delete button"
                    className="delete-button"
                    onClick={() => this.context.handleDeleteFetch(noteId)}>
                    <span>Delete</span>
                </button>
            </Link>
        )
    }
}

DeleteButton.propTypes = {
    note: PropTypes.shape({
        id: PropTypes.string,
    })
};

DeleteButton.defaultProps = {
    note: {
        id: undefined
    }
};
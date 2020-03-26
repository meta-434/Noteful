import React from 'react';
import {Link} from 'react-router-dom';
import './NoteList.css';
import NotefulContext from "../NotefulContext";

export default class NoteList extends React.Component {
    static contextType = NotefulContext;

    render() {
       console.log('notelistprops::', this.props);

        return (
            <Link
                to={`/note/${this.props.id}`}
                className="notelist"
                id={this.props.id}
            >
                <div>
                    <h3>
                        {this.props.name}
                    </h3>
                    <p>
                        {`Modified ${this.props.modified}`}
                    </p>
                </div>
            </Link>
        );
    }
}
import React from 'react';
import {Link} from 'react-router-dom';

export default class NoteList extends React.Component {

    render() {
        console.log('note props', this.props);
        return (
            <Link
                to={`/note/${this.props.id}`}
                class="note"
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
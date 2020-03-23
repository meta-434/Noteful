import React from 'react';
import {Link} from 'react-router-dom';
import './Folder.css';

export default class Folder extends React.Component {
    render() {
        return(
            <Link
                to={`/folder/${this.props.id}`}
                type="button"
                class={(this.props.isSelected) ? ("selected") : ("unselected")}
                id={this.props.id}
                onClick={this.props.selectFolder}>
                {this.props.name}
            </Link>
        );
    }
}
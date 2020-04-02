import React from 'react';
import {Link} from 'react-router-dom';
import './Folder.css';
import NotefulContext from "../NotefulContext";

export default class Folder extends React.Component {
    static contextType = NotefulContext;

    render() {
        return(
            <Link
                to={`/folder/${this.props.id}`}
                type="button"
                className={(this.props.isSelected) ? ("selected") : ("unselected")}
                id={this.props.id}
                onClick={this.props.selectFolder}>
                {this.props.name}
            </Link>
        );
    }
}
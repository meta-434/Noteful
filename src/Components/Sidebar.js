import React from 'react';
import {Link} from 'react-router-dom';
import Folder from './Folder';
import './Sidebar.css';

export default class Sidebar extends React.Component {
    render() {
        //define noteId and check for existence
        if (this.props.goBack) {
            return (
                <Link
                    to={`/folder/${this.props.activeFolder}`}
                    className={"sidebar"}
                >
                    Go Back
                </Link>
            )
        } else {
            return this.props.folders.map(folder => {
                return (
                    <Folder
                        selectFolder={(e) => this.props.selectFolder(e)}
                        name={folder.name}
                        key={folder.id}
                        id={folder.id}
                        isSelected={folder.id === this.props.path}
                    />
                );

            });
        }
    }
}
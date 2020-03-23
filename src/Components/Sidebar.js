import React from 'react';
import {Link} from 'react-router-dom';
import Folder from './Folder';

export default class Sidebar extends React.Component {
    render() {
        if (this.props.goBack) {
            return (
                <Link to={`/folder/${this.props.activeFolder}`}>
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
                        isSelected={folder.id === this.props.activeFolder}
                    />
                );

            });
        }
    }
}
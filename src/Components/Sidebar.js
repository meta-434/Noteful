import React from 'react';
import Folder from './Folder';

export default class Sidebar extends React.Component {
    render() {
        return this.props.folders.map(folder => {
            return (
               <Folder
                   selectFolder={(e) => this.props.selectFolder(e)}
                   name={folder.name}
                   id={folder.id}
                   isSelected={folder.id === this.props.activeFolder}
               />
            );
        });
    }
}
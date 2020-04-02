import React from 'react';
import {Link} from 'react-router-dom';
import Folder from './Folder';
import './Sidebar.css';
import NotefulContext from "../NotefulContext";

export default class Sidebar extends React.Component {
    static contextType = NotefulContext;

    render() {
        const { goBack, activeFolder, selectFolder, folders } = this.context;
        if (goBack) {
            return (
                <Link
                    to={`/folder/${activeFolder}`}
                    className={"sidebar"}
                >
                    Go Back
                </Link>
            )
        } else {
            return folders.map(folder => {
                return (
                    <Folder
                        selectFolder={(e) => selectFolder(e)}
                        name={folder.name}
                        key={folder.id}
                        id={folder.id}
                        isSelected={folder.id === activeFolder}
                    />
                );

            });
        }
    }
}
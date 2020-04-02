import React from 'react';

export default React.createContext({
    notes: [],
    folders: [],
    activeFolder: null,
    selectFolder: () => {},
    addFolder: () => {},
    addNote: () => {},
    deleteNote: () => {},
});
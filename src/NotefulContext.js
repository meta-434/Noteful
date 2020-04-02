import React from 'react';

export default React.createContext({
    notes: [],
    folders: [],
    activeFolder: null,
    route: null,
    updateRoute: () => {},
    selectFolder: () => {},
    addFolder: () => {},
    addNote: () => {},
    deleteNote: () => {},
});
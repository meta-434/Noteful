import React from 'react';
import { Route } from 'react-router-dom';
import STORE from './STORE';
import './App.css';
import ComponentComposer from './Components/ComponentComposer'
import NotefulContext from "./NotefulContext";

class App extends React.Component {
    state = {
        notes: [],
        folders: [],
        activeFolder: window.location.pathname.toString().slice(-36),
        route: undefined,
    };

    componentDidMount = () => {
        this.setState({notes: STORE.notes, folders: STORE.folders});
    };

    selectFolder = (e) => {
        this.setState({activeFolder: e.target.id});
        return this.state.activeFolder;
    };

    updateRoute = (route) => {
        this.setState({route})
        console.log(this.state.route);
    };

    render() {
        const { notes, folders, activeFolder, route } = this.state;
        return (
        <NotefulContext.Provider
            value={{
                notes,
                folders,
                route,
                updateRoute: this.updateRoute,
                selectFolder: this.selectFolder,
                activeFolder,
            }}
        >
            <>
                <Route
                    exact
                    path={"/"}
                    component={ComponentComposer}
                />
                <Route
                    exact
                    path={"/folder/:folderId"}
                    component={ComponentComposer}
                />
                <Route
                    exact
                    path={"/note/:noteId"}
                    component={ComponentComposer}
                />
            </>
        </NotefulContext.Provider >
        );
    }
}

export default App;

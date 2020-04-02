import React from 'react';
import Header from "./Header";
import Sidebar from "./Sidebar";
import NotefulContext from "../NotefulContext";
import NoteList from "./NoteList";
import Note from "./Note"

export default class ComponentComposer extends React.Component {
    static contextType = NotefulContext;

    render() {
        const noteRoute = (Object.keys(this.props.match.params)[0] === 'noteId');

        if (!noteRoute) {
            return(
                <>
                    <Header />
                    <Sidebar {...this.props.match.params}/>
                    <NoteList {...this.props.match.params}/>

                </>
            )
        } else {
            console.log('composer props', this.props);
            return(
                <>
                    <Header />
                    <Sidebar {...this.props.match.params}/>
                    <Note {...this.props.match.params}/>
                </>
            )
        }
    }
}
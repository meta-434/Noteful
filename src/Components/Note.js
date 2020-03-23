import React from "react";

export default class Note extends React.Component{
    render() {
        return (
            <div>
                <div>
                    <h3>
                        {this.props.name}
                    </h3>
                    <p>
                        {`Modified ${this.props.modified}`}
                    </p>
                </div>
                <p>{this.props.content}</p>
            </div>
        );
    }
}
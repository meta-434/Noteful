import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
    state = {
        error: null,
        errorInfo: null,
    }

    componentDidCatch = (error, errorInfo) => {
        this.setState({
            error,
            errorInfo,
        });
    }

    render() {
        if (this.state.errorInfo) {
            return(
                <div>
                    <h2>Something went wrong with the Nav Component...</h2>
                    <details style={{whitespace: "pre-wrap"}}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            )
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ])
};

ErrorBoundary.defaultProps = {
    children: []
};
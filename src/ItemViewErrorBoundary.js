import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ItemViewErrorBoundary extends Component {
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
                    <h2>Something went wrong with folder / note view...</h2>
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

ItemViewErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ])
};

ItemViewErrorBoundary.defaultProps = {
    children: []
};
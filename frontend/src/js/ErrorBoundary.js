import React, {
    Component
} from 'react';
import notFound from './error404.js';


export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({
            hasError: true
        });
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <notFound/>;
        }
        return this.props.children;
    }
}
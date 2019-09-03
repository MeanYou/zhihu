import * as React from 'react';
import { Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

export class ErrorBoundry extends React.Component<{}, { error: any; errorInfo: any; }> {
    constructor(props: object) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <h2>Error Thrown.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}

const Example = (props: RouteComponentProps) => {
    const [count, setCount] = React.useState(0);
    const handleClick = React.useCallback(() => {
        setCount(count + 1);
    }, [count]);
    if (count >= 5) {
        throw new Error('Count is too large!');
    }
    return (
        <div>
            <div>{count}</div>
            <Button onClick={handleClick}>+1</Button>
        </div>
    );
}

const ErrorBoundryExample = (props: RouteComponentProps) => {
    return (
        <ErrorBoundry>
            <Example {...props} />
        </ErrorBoundry>
    );
}

export default ErrorBoundryExample;
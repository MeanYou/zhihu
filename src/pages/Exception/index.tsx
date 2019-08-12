import * as React from 'react';
import { RouteChildrenProps } from 'react-router';
import { Button } from 'antd';

export interface ExceptionProps {

}

const Exception = (props:ExceptionProps & RouteChildrenProps) => {

    const backHome = React.useCallback(() => {
        props.history.push('/');
    }, [props.history]);

    return (
        <div>
            <span>exception</span>
            <Button onClick={ backHome }>回到首页</Button>
        </div>
    );
}

export default Exception;
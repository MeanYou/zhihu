import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Input, Button } from 'antd';

const { useCallback } = React;
const Login = (props:RouteComponentProps) => {
    const handleLogin = useCallback(() => {
        props.history.push('/');
    }, [props.history]);

    return (
        <div className="login">
            <Input placeholder="请输入用户名"/>
            <br/>
            <Input type="password" placeholder="请输入密码"/>
            <Button onClick={ handleLogin }>登录</Button>
        </div>
    );
}

export default Login;
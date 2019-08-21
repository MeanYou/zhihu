import * as React from 'react';

export interface LoginFormProps {
    className: string;
}

const LoginForm = (props:LoginFormProps) => {
    return (
        <div
            className={ props.className ? props.className + ' ' : '' }>
                
            </div>
    );
}
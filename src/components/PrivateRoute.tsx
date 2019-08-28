import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { StoreProps } from '@/redux/reducers';

const selector = (state: StoreProps) => {
    return {
        isLogin: state.app.isLogin
    };
}

const PrivateRoute = (props:RouteProps) => {
    const { isLogin } = useSelector(selector, shallowEqual);
    const { component: C, ...rest } = props;

    return isLogin ?
        <Route { ...props }/> :
        <Redirect to="/login"/>
}

export default PrivateRoute;
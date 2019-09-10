import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = (props:RouteProps) => {
    const token = Cookies.get('token');
    // const { component: C, ...rest } = props;

    return token ?
        <Route { ...props }/> :
        <Redirect to="/login"/>
}

export default PrivateRoute;
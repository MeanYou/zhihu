import * as React from 'react';
import { RouteProps, RouteComponentProps, Link, Switch, Route, Redirect } from 'react-router-dom';
import { Menu } from 'antd';

const { lazy, Suspense } = React;

export interface FrontPageProps {

}

const frontPaths: Array<RouteProps & { name: string }> = [
    {
        name: '推荐',
        path: '/home/recommend',
        component: lazy(() => import(/* webpackChunkName: "Recommend" */ './Recommend'))
    },
    {
        name: '热门',
        path: '/home/hot',
        component: lazy(() => import(/* webpackChunkName: "Hot" */ './Hot'))
    }
];

const FrontPage = (props: FrontPageProps & RouteComponentProps) => {

    return (
        <div>
            <Menu
                theme="light"
                mode="horizontal"
                selectedKeys={[props.location.pathname]}
                style={{ lineHeight: '64px' }}>
                {
                    frontPaths.map(item => (
                        <Menu.Item key={item.path as string}>
                            <Link to={item.path as string}>{item.name}</Link>
                        </Menu.Item>
                    ))
                }
            </Menu>
            <div>
                <Suspense fallback={<div>...loading</div>}>
                    <Switch>
                        {
                            frontPaths.map(item => (
                                <Route key={item.path as string} {...item} />
                            ))
                        }
                        <Redirect from="/home/:any" to="/404" />
                        <Redirect from="/home" to="/home/recommend" />
                    </Switch>
                </Suspense>
            </div>
        </div>
    );
}

export default FrontPage;
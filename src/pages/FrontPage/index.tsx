import * as React from 'react';
import { RouteProps, RouteComponentProps, Link, Switch, Route, Redirect } from 'react-router-dom';
import { Menu } from 'antd';
import "./style.less";

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
        <div className="front-page">
            <div className="front-page__qas">
                <Menu
                    theme="light"
                    mode="horizontal"
                    selectedKeys={[props.location.pathname]}
                    className="font-page__qas__menu">
                    {
                        frontPaths.map(item => (
                            <Menu.Item key={item.path as string}>
                                <Link to={item.path as string}>{item.name}</Link>
                            </Menu.Item>
                        ))
                    }
                </Menu>
                <div className="font-page__qas__items">
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
            <div className="front-page__info">我是信息栏</div>
        </div>

    );
}

export default FrontPage;
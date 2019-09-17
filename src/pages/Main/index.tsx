import * as React from 'react';
import { Layout, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { Route, Switch, Link, RouteComponentProps, RouteProps, Redirect } from 'react-router-dom';
import { changeScrolltop } from '@/redux/actions';
import Logo from '@/components/Logo';
import './style.less';

const { Suspense } = React;
const { Header, Content, Footer } = Layout;

// route信息
const frontPaths: Array<RouteProps & { name?: string }> = [
    {
        name: '首页',
        path: '/home',
        component: React.lazy(() => import(/* webpackChunkName: "FrontPage" */ '../FrontPage'))
    },
    {
        name: '发现',
        path: '/explore',
        component: React.lazy(() => import(/* webpackChunkName: "Explore" */ '../Explore'))
    }
];
const examplePaths: Array<RouteProps & { name?: string }> = [
    {
        name: 'UseCallback示例',
        path: '/useCallback',
        component: React.lazy(() => import(/* webpackChunkName: "UseCallback" */ '../Examples/UseCallback'))
    },
    {
        name: 'UseContext示例',
        path: '/useContext',
        component: React.lazy(() => import(/* webpackChunkName: "UseContext" */ '../Examples/UseContext'))
    },
    {
        name: 'ErrorBoundry示例',
        path: '/errorBoundry',
        component: React.lazy(() => import(/* webpackChunkName: "ErrorBoundry" */ '../Examples/ErrorBoundry'))
    },
    {
        name: 'Redux示例',
        path: '/redux',
        component: React.lazy(() => import(/* webpackChunkName: "Redux" */ '../Examples/Redux'))
    },
    {
        name: 'ReduxHooks示例',
        path: '/reduxHooks',
        component: React.lazy(() => import(/* webpackChunkName: "ReduxHooks" */ '../Examples/ReduxHooks'))
    },
    {
        name: 'Exception示例',
        path: '/:any',
        component: React.lazy(() => import(/* webpackChunkName: "Exception" */ '../Examples/Exception'))
    }
];

const Main = (props: RouteComponentProps) => {
    const dispatch = useDispatch();
    let selectedKeys = (() => {
        let keys: Array<string> = [];
        frontPaths.forEach(item => {
            if (props.location.pathname.startsWith(item.path as string)) {
                keys.push(item.path as string);
            }
        })
        keys.length === 0 && examplePaths.forEach(item => {
            if (props.location.pathname.startsWith(item.path as string)) {
                keys.push(item.path as string);
            }
        })
        return keys;
    })();

    const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
        console.log(1111111);
        dispatch(changeScrolltop(e.currentTarget.scrollTop));
    }, [dispatch]);
    return (
        <div onScroll={handleScroll} className="main">
            <Layout className="app-layout">
                <Header className="app-header">
                    <div className="app-menu">
                        <Logo className="app-logo" />
                        <Menu
                            mode="horizontal"
                            className="app-menu__items"
                            selectedKeys={selectedKeys}>
                            {
                                frontPaths.filter(item => item.name && item.path).map(item => (
                                    <Menu.Item key={item.path as string}>
                                        <Link to={item.path as string}>{item.name}</Link>
                                    </Menu.Item>
                                ))
                            }
                            <Menu.SubMenu title="示例">
                                {
                                    examplePaths.filter(item => item.name && item.path).map(item => (
                                        <Menu.Item key={item.path as string}>
                                            <Link to={item.path as string}>{item.name}</Link>
                                        </Menu.Item>
                                    ))
                                }
                            </Menu.SubMenu>
                        </Menu>
                    </div>
                </Header>
                <Content className="app-main">
                    <div className="app-content">
                        <Suspense fallback={<div>loading...</div>}>
                            <Switch>
                                {
                                    frontPaths.map(item => (
                                        <Route key={item.path as string} {...item} />
                                    ))
                                }
                                {
                                    examplePaths.map(item => (
                                        <Route key={item.path as string} {...item} />
                                    ))
                                }
                                <Redirect from="/" to="/home" />
                            </Switch>
                        </Suspense>
                    </div>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </div>
    );
}

export default Main;
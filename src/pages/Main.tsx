import * as React from 'react';
import { Layout, Menu } from 'antd';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { Route, Switch, Link } from 'react-router-dom';

const { Suspense } = React;
const { Header, Content, Footer } = Layout;

// route信息
const paths:Array<RouteProps & {name?:string}> = [
    {
        path: '/',
        exact: true,
        component: React.lazy(() => import(/* webpackChunkName: "UseCallback" */ './UseCallback'))
    },
    {
        name: 'UseCallback示例',
        path: '/useCallback',
        component: React.lazy(() => import(/* webpackChunkName: "UseCallback" */ './UseCallback'))
    },
    {
        name: 'UseContext示例',
        path: '/useContext',
        component: React.lazy(() => import(/* webpackChunkName: "UseContext" */ './UseContext'))
    },
    {
        name: 'ErrorBoundry示例',
        path: '/errorBoundry',
        component: React.lazy(() => import(/* webpackChunkName: "ErrorBoundry" */ './ErrorBoundry'))
    },
    {
        name: 'Redux示例',
        path: '/redux',
        component: React.lazy(() => import(/* webpackChunkName: "ErrorBoundry" */ './Redux'))
    },
    {
        name: 'ReduxHooks示例',
        path: '/reduxHooks',
        component: React.lazy(() => import(/* webpackChunkName: "ReduxHooks" */ './ReduxHooks'))
    },
    {
        name: 'Exception示例',
        component: React.lazy(() => import(/* webpackChunkName: "Exception" */ './Exception'))
    }
];

const Main = (props:RouteComponentProps) => {
    return (
        <div>
            <Layout>
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[props.location.pathname]}
                        style={{ lineHeight: '64px' }}>
                        {
                            paths.filter(item => item.name && item.path).map(item => (
                                <Menu.Item key={ item.path as string }>
                                    <Link to={ item.path as string }>{ item.name }</Link>
                                </Menu.Item>
                            ))
                        }
                        <Menu.Item key="/404">
                            <Link to="/404">Exception示例</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <Suspense fallback={<div>loading...</div>}>
                        <Switch>
                            {
                                paths.map((item, index) => (
                                    <Route key={ index } {...item}/>
                                ))
                            }
                        </Switch>
                    </Suspense>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </div>
    );
}

export default Main;
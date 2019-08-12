import * as React from 'react';
import { Layout, Menu } from 'antd';
import { Route, Switch, Link } from 'react-router-dom';

const { Suspense } = React;
const { Header, Content, Footer } = Layout;

const Main = () => {
    return (
        <div>
            <Layout>
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}>
                        <Menu.Item key="1">
                            <Link to="/useCallback">UseCallback示例</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/useContext">UseContext示例</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/errorBoundry">ErrorBoundry示例</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/redux">redux示例</Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="/404">404示例</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <Suspense fallback={<div>loading...</div>}>
                        <Switch>
                            <Route exact path="/" component={React.lazy(() => import(/* webpackChunkName: "UseCallback" */ './UseCallback'))} />
                            <Route path="/useCallback" component={React.lazy(() => import(/* webpackChunkName: "UseCallback" */ './UseCallback'))} />
                            <Route path="/useContext" component={React.lazy(() => import(/* webpackChunkName: "UseContext" */ './UseContext'))} />
                            <Route path="/errorBoundry" component={React.lazy(() => import(/* webpackChunkName: "ErrorBoundry" */ './ErrorBoundry'))} />
                            <Route path="/redux" component={React.lazy(() => import(/* webpackChunkName: "ErrorBoundry" */ './Redux'))} />
                            <Route component={React.lazy(() => import(/* webpackChunkName: "Exception" */ './Exception'))} />
                        </Switch>
                    </Suspense>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </div>
    );
}

export default Main;
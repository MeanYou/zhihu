import * as React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './redux/store';
// import Main from './pages/Main';
// import Login from './pages/Login';
import mock from './mock';
import './App.less';
import PrivateRoute from './components/PrivateRoute';

mock();// 模拟返回数据

const { lazy, Suspense } = React;

const Login = lazy(() => import(/* webpackChunkName: "Login" */ './pages/Login'));
const Main = lazy(() => import(/* webpackChunkName: "Main" */ './pages/Main'));

function App() {
    return (
        <Provider store={store}>
            <ConfigProvider locale={zh_CN}>
                <Router>
                    <Suspense fallback={<div>...loading</div>}>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <PrivateRoute path="/" component={Main} />
                        </Switch>
                    </Suspense>
                </Router>
            </ConfigProvider>
        </Provider>
    );
}

export default App;

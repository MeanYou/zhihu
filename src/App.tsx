import * as React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter as Router, Switch, Route, RouteProps } from 'react-router-dom';
import store from './redux/store';
import Main from './pages/Main';
import Login from './pages/Login';
import mock from 'mock';
import useInitialize from './hooks/useInitialize';
import './App.less';

mock();// 模拟返回数据

function App() {
    useInitialize(() => {
        
    });
    return (
        <Provider store={store}>
            <ConfigProvider locale={zh_CN}>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/" component={Main} />
                    </Switch>
                </Router>
            </ConfigProvider>
        </Provider>
    );
}

const PrivateRoute = (props:RouteProps) => {
    const { component: C, ...rest } = props;
    return (
        <Route {...props}/>
    );
}

export default App;

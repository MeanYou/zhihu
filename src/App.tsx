import * as React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './redux/store';
import Main from './pages/Main';
import Login from './pages/Login';
import mock from 'mock';

mock();// 模拟返回数据

function App() {
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

export default App;

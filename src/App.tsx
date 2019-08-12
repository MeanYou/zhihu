import * as React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import Main from './pages/Main';

function App() {
    return (
        <Provider store={store}>
            <ConfigProvider locale={zh_CN}>
                <Router>
                    <Main />
                </Router>
            </ConfigProvider>
        </Provider>
    );
}

export default App;

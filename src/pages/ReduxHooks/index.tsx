import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { StoreProps } from '@/redux/reducers';
import { showLoadingWithTimeout } from '../../redux/actions';

const selector = (state: StoreProps) => {
    console.log(state);
    return {
        loading: state.app.showLoading,
        loadingText: state.app.loadingText
    };
}

const ReduxHooks = (props: RouteComponentProps) => {
    console.log(props);
    const { loading, loadingText } = useSelector(selector);
    const dispatch = useDispatch();

    const handleClick = React.useCallback(() => {
        dispatch(showLoadingWithTimeout('正在加载'));
    }, [])

    return (
        <div>
            <Button loading={loading} onClick={ handleClick }>{loadingText}</Button>
        </div>
    );
}

export default ReduxHooks;
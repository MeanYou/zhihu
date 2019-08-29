import { useSelector, shallowEqual } from 'react-redux';
import { StoreProps } from '@/redux/reducers';

const selector = (state: StoreProps):boolean => {
    return state.app.isLogin;
}

const useIsLogin = () => {
    const isLogin = useSelector<StoreProps, boolean>(selector, shallowEqual);
    return isLogin;
}

export default useIsLogin;
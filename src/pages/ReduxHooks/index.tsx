import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Button } from 'antd';
import { StoreProps } from '@/redux/reducers';
import { showLoadingWithTimeout, setUsername } from '../../redux/actions';

const { useCallback, useState } = React;

// 无需props闭包的selector放在组件外
const selector = (state: StoreProps) => {
    return {
        loading: state.app.showLoading,
        loadingText: state.app.loadingText
    };
}
/**
 * useSelector的两个问题：
 * 1. dispatch一个action之后，所有用到useSelector的组件都会做===比较，导致所有组件都会重新渲染
 * 2. props变化，selector不变，则不会重新执行selector
 * @param props 
 * 放开console在控制台查看输出
 */
const ReduxHooks = (props: RouteComponentProps) => {
    console.log('father');
    // 使用shalllowEqual比较每次dispatch后useSelector的结果，默认===导致所有组件重新渲染
    const { loading, loadingText } = useSelector(selector, shallowEqual);
    const dispatch = useDispatch();

    const handleClick = useCallback(() => {
        dispatch(showLoadingWithTimeout('正在加载'));
    }, [dispatch]);

    return (
        <div>
            <Button loading={loading} onClick={handleClick}>{loadingText}</Button>
            <Child1 />
            <Child2 />
        </div>
    );
}

// 不依赖组件内部state或props的情况下直接在组件外部定义selector
// const selector1 = (state: StoreProps) => {
//     console.log('selector1');
//     return {
//         username: state.app.username
//     };
// }

const Child1 = () => {
    // console.log('child1');
    const [age, setAge] = useState('0');
    const handleAgeChange = useCallback((e) => {
        setAge(e.target.value);
    }, []);

    const [grade, setGrade] = useState('1');
    const handleGradeChange = useCallback((e) => {
        setGrade(e.target.value);
    }, []);
    
    const selector1 = useCallback((state:StoreProps) => {
        console.log('selector1');
        return {
            username: state.app.username + age
        }
    }, [age]);
    const obj = useSelector(selector1, shallowEqual);
    const dispatch = useDispatch();
    const handleChange = useCallback((e) => {
        dispatch(setUsername(e.target.value));
    }, [dispatch]);
    return (
        <div>
            <input value={obj.username} onChange={handleChange} />
            <input value={age} onChange={handleAgeChange} />
            <input value={grade} onChange={handleGradeChange} />
        </div>
    );
}

const selector2 = (state: StoreProps) => {
    return {
        todos: state.app.todos
    }
}
const Child2 = () => {
    // console.log('child2');
    const obj = useSelector(selector2, shallowEqual);
    return (
        <div>
            {obj.todos.map((item: string) => {
                return (<div>{item}</div>)
            })}
        </div>
    );
}

export default ReduxHooks;
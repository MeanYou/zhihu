import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { setUsername, addTodo, showLoadingWithTimeout } from '../../redux/actions';

const { useState, useCallback } = React;

// redux集成第一阶段暂时使用any表示
const ReduxExample = (props: any) => {
    const [todo, setTodo] = useState('');

    const handleUsernameChange = useCallback((e) => {
        props.setUsername(e.target.value);
    }, [props]);

    const handleTodoChange = useCallback((e) => {
        setTodo(e.target.value);
    }, []);

    const handleAddTodo = useCallback((e) => {
        if (todo) {
            props.addTodo(todo);
            setTodo('');
        } else {
            alert('待办事项为空');
        }
    }, [todo, props]);

    const handleLoad = useCallback(() => {
        // props.showLoading('正在加载');
        // setTimeout(() => {
        //     props.hideLoading();
        // }, 3000)
        // 返回了promise的thunk action
        props.showLoadingWithTimeout('正在加载').then((data:any) => {
            console.log(data);
        });
    }, []);

    return (
        <div>
            <div>用户名：<input onChange={handleUsernameChange} /></div>
            <div>{props.username}</div>
            <hr />
            <div>待办事项：<input value={todo} onChange={handleTodoChange} /><button onClick={handleAddTodo}>新增</button></div>
            <div>{props.todos.map((item: string) => (
                <span>{item},</span>
            ))}</div>
            <Button loading={ props.loading } onClick={ handleLoad }>{ props.loadingText || '按钮' }</Button>
        </div>
    );
}

const mapState2Props = (state: any) => {
    return {
        username: state.app.username,
        todos: state.app.todos,
        loading: state.app.showLoading,
        loadingText: state.app.loadingText
    };
}
const mapDispatch2Props = {
    setUsername,
    addTodo,
    showLoadingWithTimeout
};

export default connect(mapState2Props, mapDispatch2Props)(ReduxExample);
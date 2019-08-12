import * as React from 'react';
import { connect } from 'react-redux';
import { setUsername, addTodo } from '../../redux/actions';

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

    return (
        <div>
            <div>用户名：<input onChange={handleUsernameChange} /></div>
            <div>{props.username}</div>
            <hr />
            <div>待办事项：<input value={todo} onChange={handleTodoChange} /><button onClick={handleAddTodo}>新增</button></div>
            <div>{props.todos.map((item: string) => (
                <span>{item},</span>
            ))}</div>
            <a href="https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559">准备新增中间件</a>
        </div>
    );
}

const mapState2Props = (state: any) => {
    console.log(state);
    return {
        username: state.app.username,
        todos: state.app.todos
    };
}
const mapDispatch2Props = {
    setUsername,
    addTodo
};

export default connect(mapState2Props, mapDispatch2Props)(ReduxExample);
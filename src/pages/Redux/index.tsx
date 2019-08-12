import * as React from 'react';
import { connect } from 'react-redux';
import { setUsername, addTodo } from '../../redux/actions';

const { useState, useCallback } = React;

// redux集成第一阶段暂时使用any表示
const ReduxExample = (props:any) => {
    const [todo, setTodo] = useState('');

    const handleUsernameChange = useCallback((e) => {
        props.setUsername(e.target.value);
    }, [props]);

    const handleTodoChange = useCallback((e) => {
        setTodo(e.target.value);
    }, []);

    const handleAddTodo = useCallback((e) => {
        if(todo) {
            debugger;
            props.addTodo(todo);
        } else {
            alert('待办事项为空');
        }
    }, [todo, props]);

    return (
        <div>
            <div>用户名：<input onChange={ handleUsernameChange }/></div>
            <div>{ props.username }</div>
            <hr/>
            <div>待办事项：<input onChange={ handleTodoChange }/><button onClick={ handleAddTodo }>新增</button></div>
            {/* <div>{ props.todos.map((item:string) => (
                <span>{ item },</span>
            )) }</div> */}
            <div>{ props.todos }</div>
        </div>
    );
}

const mapState2Props = (state:any) => {
    return {
        username: state.username,
        todos: state.todos
    };
}
const mapDispatch2Props = () => {
    return {
        setUsername,
        addTodo
    }
}

export default connect(mapState2Props, mapDispatch2Props)(ReduxExample);
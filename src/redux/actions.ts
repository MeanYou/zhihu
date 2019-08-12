import { SET_USERNAME, ADD_TODO } from './actionTypes';

export const setUsername = (username:string) => ({
    type: SET_USERNAME,
    payload: username
});

export const addTodo = (content:string) => ({
    type: ADD_TODO,
    payload: content
});
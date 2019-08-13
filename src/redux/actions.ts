import { SET_USERNAME, ADD_TODO, SHOW_LOADING, HIDE_LOADING } from './actionTypes';

export const setUsername = (username:string) => ({
    type: SET_USERNAME,
    payload: username
});

export const addTodo = (content:string) => ({
    type: ADD_TODO,
    payload: content
});

export const showLoading = (content:string) => ({
    type: SHOW_LOADING,
    payload: content
});

export const hideLoading = () => ({
    type: HIDE_LOADING
});

export const showLoadingWithTimeout = (text:string) => (dispatch:any, getState:any) => {
    // console.log(getState());
    // dispatch(showLoading(text));
    // setTimeout(() => {
    //     const data = {a: 1,b: 2,c: 3};
    //     dispatch(hideLoading());
    // }, 3000);
    return new Promise((resolve, reject) => {
        dispatch(showLoading(text));
        setTimeout(() => {
            const data = {a: 1,b: 2,c: 3};
            dispatch(hideLoading());
            resolve(data);
        }, 3000);
    });
};
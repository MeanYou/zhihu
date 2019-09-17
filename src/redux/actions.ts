import { CHANGE_ISLOGIN, SET_USERNAME, ADD_TODO, SHOW_LOADING, HIDE_LOADING, CHANGE_SCROLLTOP } from './actionTypes';

export interface ActionProps {
    type: string;
    payload?: any;
}

export const changeIsLogin = (isLogin: boolean): ActionProps => ({
    type: CHANGE_ISLOGIN,
    payload: isLogin
});

export const setUsername = (username: string): ActionProps => ({
    type: SET_USERNAME,
    payload: username
});

export const addTodo = (content: string): ActionProps => ({
    type: ADD_TODO,
    payload: content
});

export const showLoading = (content: string): ActionProps => ({
    type: SHOW_LOADING,
    payload: content
});

export const hideLoading = (): ActionProps => ({
    type: HIDE_LOADING
});

export const changeScrolltop = (scrollTop: number): ActionProps => ({
    type: CHANGE_SCROLLTOP,
    payload: scrollTop
});

export const showLoadingWithTimeout = (text: string) => (dispatch: any, getState: any) => {
    // console.log(getState());
    // dispatch(showLoading(text));
    // setTimeout(() => {
    //     const data = {a: 1,b: 2,c: 3};
    //     dispatch(hideLoading());
    // }, 3000);
    return new Promise((resolve, reject) => {
        dispatch(showLoading(text));
        setTimeout(() => {
            const data = { a: 1, b: 2, c: 3 };
            dispatch(hideLoading());
            resolve(data);
        }, 3000);
    });
};
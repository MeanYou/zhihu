import { CHANGE_ISLOGIN, SET_USERNAME, ADD_TODO, SHOW_LOADING, HIDE_LOADING } from '../actionTypes';
import { ActionProps } from '../actions';

export interface StateProps {
    isLogin: boolean;
    username: string;
    todos: string[];
    showLoading: boolean;
    loadingText: string;
}

const initialState = {
    isLogin: false,
    username: '',
    todos: [],
    showLoading: false,
    loadingText: ''
};

export default function(state:StateProps = initialState, action:ActionProps) {
    switch(action.type) {
        case CHANGE_ISLOGIN: {
            return {
                ...state,
                isLogin: action.payload
            };
        }
        case SET_USERNAME: {
            return {
                ...state,
                username: action.payload
            };
        }
        case ADD_TODO: {
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        }
        case SHOW_LOADING: {
            return {
                ...state,
                showLoading: true,
                loadingText: action.payload
            };
        }
        case HIDE_LOADING: {
            return {
                ...state,
                showLoading: false,
                loadingText: ''
            }
        }
        default:
            return state;
    }
}
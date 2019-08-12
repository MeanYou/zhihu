import { SET_USERNAME, ADD_TODO } from '../actionTypes';

export interface StateProps {
    username: string;
    todos: string[];
}
export interface ActionProps {
    type: string;
    payload: any;
}

const initialState = {
    username: '',
    todos: []
};

export default function(state:StateProps = initialState, action:ActionProps) {
    switch(action.type) {
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
        default:
            return state;
    }
}
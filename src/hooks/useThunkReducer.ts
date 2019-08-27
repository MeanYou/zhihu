import * as React from 'react';

type Reducer<S, A> = (prevState: S, action: A) => S;

const { useReducer } = React;
const useThunkReducer = <S, A>(reducer:Reducer<any, any>, initialState:S):[S, any] => {
    const [state, dispatch] = useReducer<Reducer<S, A>>(reducer, initialState);

    const thunkDispatch = (action:any) => {
        if(typeof action === 'function') {
            return action(thunkDispatch, () => state);
        } else {
            return dispatch(action);
        }
    }

    return [state, thunkDispatch];
};

export default useThunkReducer;
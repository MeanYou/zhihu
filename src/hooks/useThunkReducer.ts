import * as React from 'react';

type Reducer<S, A> = (prevState: S, action: A) => S;

const { useReducer } = React;
const useThunkReducer = <S>(reducer:Reducer<any, any>, initialState:S) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const thunkDispatch = (action:any) => {
        if(typeof action === 'function') {
            action(dispatch, () => state);
        } else {
            dispatch(action);
        }
    }

    return [state, thunkDispatch];
};

export default useThunkReducer;
/**
 * 作为局部store的thunk中间件替代品
 */
import * as React from 'react';
export type ThunkActionType<S> = {
    [key:string]: any
} | {
    (dispatch: ThunkActionType<S>, getState: ()=>S): Promise<any> | void
}
const { useReducer } = React;
const useThunkReducer = <S, A>(reducer:React.Reducer<S, A>, initialState:S):[S, (action:ThunkActionType<S>) => Promise<any>] => {
    const [state, dispatch] = useReducer<React.Reducer<S, A>>(reducer, initialState);

    const thunkDispatch = (action:ThunkActionType<S>) => {
        if(typeof action === 'function') {
            return action(thunkDispatch, () => state);
        } else {
            return dispatch(action as A);
        }
    }

    return [state, thunkDispatch];
};

export default useThunkReducer;
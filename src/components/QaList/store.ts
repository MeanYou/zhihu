/** 
 * store
*/
export interface State {
    fixFlag: boolean;
    commentVisible: boolean;
}

export const initialState: State = {
    fixFlag: true,
    commentVisible: false
};

/** 
 * action
*/
// action constant
const CHANGE_FIX_FLAG = 'CHANGE_FIX_FLAG';
const CHANGE_COMMENT_VISIBLE = 'CHANGE_COMMENT_VISIBLE';
// action type
export type Action = {
    type: 'CHANGE_FIX_FLAG';
    payload: boolean
} | {
    type: 'CHANGE_COMMENT_VISIBLE';
    payload: boolean
}
// 状态action
export const changeFixFlag = (flag: boolean) => ({
    type: CHANGE_FIX_FLAG,
    payload: flag
});
export const changeCommentVisible = (visible: boolean) => ({
    type: CHANGE_COMMENT_VISIBLE,
    payload: visible
});
// 业务action
//  export const getVariableByApi = (param:string) => async (dispatch:any, getState:any) => {
//     // 也可以返回Promise
//     const res = await xhr.get('/api', {params: {param}});
//     dispatch(changeVariable(res.data));
//  }

/** 
 * reducer
*/
export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case CHANGE_FIX_FLAG:
            return {
                ...state,
                fixFlag: action.payload
            };
        case CHANGE_COMMENT_VISIBLE:
            return {
                ...state,
                commentVisible: action.payload
            };
        default:
            return state;
    }
}
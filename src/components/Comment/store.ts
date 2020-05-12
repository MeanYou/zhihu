import { CommentProps } from '@/common/CommonInterface';
import xhr from '@/common/xhr';
/** 
 * store
*/
export interface State {
    commentList: CommentProps[];
};
export const initialState: State = {
    commentList: []
};

/** 
 * action
*/
// action constant
const CHANGE_COMMENT_LIST = 'CHANGE_COMMENT_LIST';
// action type
export type Action = {
    type: 'CHANGE_COMMENT_LIST',
    payload: CommentProps[]
}
// 状态action
export const changeCommentList = (list: CommentProps[]) => ({
    type: CHANGE_COMMENT_LIST,
    payload: list
})
// 业务action
export const getCommentListById = (answerId: number, pageNum: number) => async (dispatch: any, getState: any) => {
    // 也可以返回Promise
    const res = await xhr.get(`/home/answer/${answerId}/comment?offset=${pageNum}&limit=10`);
    console.log(res);
    dispatch(changeCommentList(res.data));
}

/** 
 * reducer
*/
export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case CHANGE_COMMENT_LIST:
            return {
                ...state,
                commentList: action.payload
            };
        default:
            return state;
    }
}
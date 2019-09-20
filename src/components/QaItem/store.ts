/**
 * store
 */
export interface State {
    authorVisible: boolean;
    fullContentVisible: boolean;
    shouldItemFix: boolean;
    itemEmphasis: boolean;
    commentVisible: boolean;
    toggleCommentVisible: boolean;
    commentModalVisible: boolean;
}
export const initialState: State = {
    authorVisible: true,
    fullContentVisible: false,
    shouldItemFix: false,
    itemEmphasis: false,
    commentVisible: false,
    toggleCommentVisible: false,
    commentModalVisible: false
};


/**
 * action
 */
// action constant
const CHANGE_AUTHOR_VISIBLE = 'CHANGE_AUTHOR_VISIBLE';
const CHANGE_FULL_CONTENT_VISIBLE = 'CHANGE_FULL_CONTENT_VISIBLE';
const CHANGE_SHOULD_ITEM_FIX = 'CHANGE_SHOULD_ITEM_FIX';
const CHANGE_ITEM_EMPHASIS = 'CHANGE_ITEM_EMPHASIS';
const CHANGE_COMMENT_VISIBLE = 'CHANGE_COMMENT_VISIBLE';
const CHANGE_TOGGLE_COMMENT_VISIBLE = 'CHANGE_TOGGLE_COMMENT_VISIBLE';
const CHANGE_COMMENT_MODAL_VISIBLE = 'CHANGE_COMMENT_MODAL_VISIBLE';
// 业务action
const HANDLE_FOLD_UP = 'HANDLE_FOLD_UP';

// action type
export type Action = {
    type: 'CHANGE_AUTHOR_VISIBLE';
    payload: boolean;
} | {
    type: 'CHANGE_FULL_CONTENT_VISIBLE';
    payload: boolean;
} | {
    type: 'CHANGE_SHOULD_ITEM_FIX';
    payload: boolean;
} | {
    type: 'CHANGE_ITEM_EMPHASIS';
    payload: boolean;
} | {
    type: 'CHANGE_COMMENT_VISIBLE';
    payload: boolean;
} | {
    type: 'CHANGE_TOGGLE_COMMENT_VISIBLE';
    payload: boolean;
} | {
    type: 'CHANGE_COMMENT_MODAL_VISIBLE';
    payload: boolean;
} | {// 业务状态
    type: 'HANDLE_FOLD_UP';
};

// action creator
// 状态action
export const changeAuthorVisible = (show: boolean) => ({
    type: CHANGE_AUTHOR_VISIBLE,
    payload: show
});
export const changeFullContentVisible = (show: boolean) => ({
    type: CHANGE_FULL_CONTENT_VISIBLE,
    payload: show
});
export const changeShouldItemFix = (fix:boolean) => ({
    type: CHANGE_SHOULD_ITEM_FIX,
    payload: fix
});
export const changeItemEmphasis = (emphasis:boolean) => ({
    type: CHANGE_ITEM_EMPHASIS,
    payload: emphasis
});
export const changeCommentVisible = (show: boolean) => ({
    type: CHANGE_COMMENT_VISIBLE,
    payload: show
});
export const changeToggleCommentVisible = (show: boolean) => ({
    type: CHANGE_TOGGLE_COMMENT_VISIBLE,
    payload: show
});
export const changeCommentModalVisible = (show: boolean) => ({
    type: CHANGE_COMMENT_MODAL_VISIBLE,
    payload: show
});
// 业务action
export const handleFoldUp = () => ({
    type: HANDLE_FOLD_UP
});
export const handleClickFoldUp = () => (dispatch:any, getState:any) => {
    dispatch(handleFoldUp());
    setTimeout(() => {
        dispatch(changeItemEmphasis(false));
    }, 1500);
}


/**
 * reducer
 */
export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case CHANGE_AUTHOR_VISIBLE:
            return {
                ...state,
                authorVisible: action.payload
            };
        case CHANGE_FULL_CONTENT_VISIBLE:
            return {
                ...state,
                fullContentVisible: action.payload
            };
        case CHANGE_SHOULD_ITEM_FIX:
            return {
                ...state,
                shouldItemFix: action.payload
            };
        case CHANGE_ITEM_EMPHASIS:
            return {
                ...state,
                itemEmphasis: action.payload
            };
        case CHANGE_COMMENT_VISIBLE:
            return {
                ...state,
                commentVisible: action.payload
            };
        case CHANGE_TOGGLE_COMMENT_VISIBLE:
            return {
                ...state,
                toggleCommentVisible: action.payload
            };
        case CHANGE_COMMENT_MODAL_VISIBLE:
            return {
                ...state,
                commentModalVisible: action.payload
            };
        // 业务action
        case HANDLE_FOLD_UP:
            return {
                ...state,
                fullContentVisible: false,
                shouldItemFix: false,
                itemEmphasis: true
            };
        default:
            return state;
    }
}
// store
export interface State {
    authorVisible: boolean;
    fullContentVisible: boolean;
    shouldItemFix: boolean;
    commentVisible: boolean;
    toggleCommentVisible: boolean;
    commentModalVisible: boolean;
}

export const initialState: State = {
    authorVisible: true,
    fullContentVisible: false,
    shouldItemFix: false,
    commentVisible: false,
    toggleCommentVisible: false,
    commentModalVisible: false
};

// action
// action constant
const CHANGE_AUTHOR_VISIBLE = 'CHANGE_AUTHOR_VISIBLE';
const CHANGE_FULL_CONTENT_VISIBLE = 'CHANGE_FULL_CONTENT_VISIBLE';
const CHANGE_SHOULD_ITEM_FIX = 'CHANGE_SHOULD_ITEM_FIX';
const CHANGE_COMMENT_VISIBLE = 'CHANGE_COMMENT_VISIBLE';
const CHANGE_TOGGLE_COMMENT_VISIBLE = 'CHANGE_TOGGLE_COMMENT_VISIBLE';
const CHANGE_COMMENT_MODAL_VISIBLE = 'CHANGE_COMMENT_MODAL_VISIBLE';
// action type
export type Action = {
    type: 'CHANGE_AUTHOR_VISIBLE',
    payload: boolean;
} | {
    type: 'CHANGE_FULL_CONTENT_VISIBLE',
    payload: boolean;
} | {
    type: 'CHANGE_SHOULD_ITEM_FIX',
    payload: boolean;
} | {
    type: 'CHANGE_COMMENT_VISIBLE',
    payload: boolean;
} | {
    type: 'CHANGE_TOGGLE_COMMENT_VISIBLE',
    payload: boolean;
} | {
    type: 'CHANGE_COMMENT_MODAL_VISIBLE',
    payload: boolean;
};
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


// reducer
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
        default:
            return state;
    }
}

// 业务action
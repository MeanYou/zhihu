// store
export interface State {
    hotItems: Array<HotItem>;
}

export const initialState: State = {
    hotItems: []
};

export interface HotItem {
    title: string;
}

// action
// action constant
const CHANGE_HOT_ITEMS = 'CHANGE_HOT_ITEMS';
// action type
export type Action = {
    type: 'CHANGE_HOT_ITEMS',
    payload: Array<HotItem>
}
// 状态action
export const changeHotItem = (hotItems: Array<HotItem>) => ({
    type: CHANGE_HOT_ITEMS,
    payload: hotItems
})

// reducer
export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case CHANGE_HOT_ITEMS:
            return {
                ...state,
                hotItems: action.payload
            };
        default:
            return state;
    }
}

// 业务action
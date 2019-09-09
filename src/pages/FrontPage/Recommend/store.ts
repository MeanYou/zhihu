// store
export interface State {
    qaList: Array<QaItem>;
}

export const initialState: State = {
    qaList: []
};

export interface QaItem {
    question: string;
}

// action
// action constant
const CHANGE_QA_LIST = 'CHANGE_QA_LIST';
// action type
export type Action = {
    type: 'CHANGE_QA_LIST',
    payload: Array<QaItem>
}
// 状态action
export const changeHotItem = (qaItems: Array<QaItem>) => ({
    type: CHANGE_QA_LIST,
    payload: qaItems
})

// reducer
export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case CHANGE_QA_LIST:
            return {
                ...state,
                qaItems: action.payload
            };
        default:
            return state;
    }
}

// 业务action
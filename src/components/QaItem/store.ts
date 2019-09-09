import { AnswerProps } from '@/utils/CommonInterface';
export { AnswerProps };

// store
export interface State {
    answer: AnswerProps;
}

export const initialState: State = {
    answer: {};
};

// action
// action constant
const CHANGE_QA_LIST = 'CHANGE_QA_LIST';
// action type
export type Action = {
    type: 'CHANGE_QA_LIST',
    payload: Array<AnswerProps>
}
// 状态action
export const changeHotItem = (qaItems: Array<AnswerProps>) => ({
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
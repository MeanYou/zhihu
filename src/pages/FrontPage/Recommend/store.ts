import { AnswerProps } from '@/common/CommonInterface';
import xhr from '@/common/xhr';
// store
export interface State {
    qaList: Array<AnswerProps>;
}

export const initialState: State = {
    qaList: []
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
export const changeQaList = (qaList: Array<AnswerProps>) => ({
    type: CHANGE_QA_LIST,
    payload: qaList
})

// reducer
export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case CHANGE_QA_LIST:
            return {
                ...state,
                qaList: action.payload
            };
        default:
            return state;
    }
}

// 业务action
export const getRecommendQaList = (offset: number, limit: number = 10) => async (dispath: any, getState: any) => {
    const res = await xhr.get('/recommend', { params: { offset, limit } });
    const qaList = res.data.map((item: any) => item.target);
    console.log(qaList);
    dispath(changeQaList(qaList));
};
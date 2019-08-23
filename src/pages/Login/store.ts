// store
export interface State {
    loginType: 'vrf' | 'pwd';// 验证码登录，密码登录
    telNumber: string;
    verifyCode: string;
    username: string;
    password: string;
    verifyType: 'message' | 'voice';
    canGetVerifyCode: boolean;
    verifySecondsLeft: number;
}
export const initialState: State = {
    loginType: 'vrf',
    telNumber: '',
    verifyCode: '',
    username: '',
    password: '',
    verifyType: 'message',
    canGetVerifyCode: true,
    verifySecondsLeft: 60
}

// action
// action constant
const CHANGE_LOGIN_TYPE = 'CHANGE_LOGIN_TYPE';
const CHANGE_TEL_NUMBER = 'CHANGE_TEL_NUMBER';
const CHANGE_VERIFY_CODE = 'CHANGE_VERIFY_CODE';
const CHANGE_USERNAME = 'CHANGE_USERNAME';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
const CHANGE_VERIFY_TYPE = 'CHANGE_VERIFY_TYPE';

// action type
type Action = {
    type: 'CHANGE_LOGIN_TYPE';
    payload: 'vrf' | 'pwd';
} | {
    type: 'CHANGE_TEL_NUMBER';
    payload: string;
} | {
    type: 'CHANGE_VERIFY_CODE';
    payload: string;
} | {
    type: 'CHANGE_USERNAME';
    payload: string;
} | {
    type: 'CHANGE_PASSWORD';
    payload: string;
} | {
    type: 'CHANGE_VERIFY_TYPE',
    payload: 'message' | 'voice';
}

// action creator
export const changeLoginType = (type: 'vrf' | 'pwd'): Action => ({
    type: CHANGE_LOGIN_TYPE,
    payload: type
});
export const changeTelNumber = (telNumber: string): Action => ({
    type: CHANGE_TEL_NUMBER,
    payload: telNumber
});
export const changeVerifyCode = (verifyCode: string): Action => ({
    type: CHANGE_VERIFY_CODE,
    payload: verifyCode
});
export const changeUsername = (username: string): Action => ({
    type: CHANGE_USERNAME,
    payload: username
});
export const changePassword = (password: string): Action => ({
    type: CHANGE_PASSWORD,
    payload: password
});
export const changeVerifyType = (type: 'message' | 'voice'): Action => ({
    type: CHANGE_VERIFY_TYPE,
    payload: type
})
export const loginByPwdAndGetTel = () => (dispatch:any, getState:any) => {
    dispatch(changeLoginType('pwd'));
    const state = getState();
    if(!state.username) {
        dispatch(changeUsername(state.telNumber));
    }
}

// reducer
export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case CHANGE_LOGIN_TYPE:
            return {
                ...state,
                loginType: action.payload
            };
        case CHANGE_TEL_NUMBER:
            return {
                ...state,
                telNumber: action.payload
            };
        case CHANGE_VERIFY_CODE:
            return {
                ...state,
                verifyCode: action.payload
            };
        case CHANGE_USERNAME:
            return {
                ...state,
                username: action.payload
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                password: action.payload
            };
        case CHANGE_VERIFY_TYPE:
            return {
                ...state,
                verifyType: action.payload
            };
        default:
            return state;
    }
}


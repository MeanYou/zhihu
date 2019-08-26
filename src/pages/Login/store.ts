import xhr from '@/utils/xhr';
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
    telNumberValid: boolean;
    usernameValid: boolean;
    verifyCodeValid: boolean;
    passwordValid: boolean;
}
export const initialState: State = {
    loginType: 'vrf',
    telNumber: '',
    verifyCode: '',
    username: '',
    password: '',
    verifyType: 'message',
    canGetVerifyCode: true,
    verifySecondsLeft: 60,
    telNumberValid: true,
    usernameValid: true,
    verifyCodeValid: true,
    passwordValid: true,
}

// action
// action constant
const CHANGE_LOGIN_TYPE = 'CHANGE_LOGIN_TYPE';
const CHANGE_TEL_NUMBER = 'CHANGE_TEL_NUMBER';
const CHANGE_VERIFY_CODE = 'CHANGE_VERIFY_CODE';
const CHANGE_USERNAME = 'CHANGE_USERNAME';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
const CHANGE_VERIFY_TYPE = 'CHANGE_VERIFY_TYPE';
const CHANGE_CAN_GET_VERIFY_CODE = 'CHANGE_CAN_GET_VERIFY_CODE';
const CHANGE_VERIFY_SECONDS_LEFT = 'CHANGE_VERIFY_SECONDS_LEFT';
const CHANGE_TEL_NUMBER_VALID = 'CHANGE_TEL_NUMBER_VALID';
const CHANGE_VERIFY_CODE_VALID = 'CHANGE_TEL_NUMBER_VALID';
const CHANGE_USERNAME_VALID = 'CHANGE_TEL_NUMBER_VALID';
const CHANGE_PASSWORD_VALID = 'CHANGE_TEL_NUMBER_VALID';

// action type
export type Action = {
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
} | {
    type: 'CHANGE_CAN_GET_VERIFY_CODE',
    payload: boolean;
} | {
    type: 'CHANGE_VERIFY_SECONDS_LEFT',
    payload: number;
} | {
    type: 'CHANGE_TEL_NUMBER_VALID',
    payload: boolean;
} | {
    type: 'CHANGE_VERIFY_CODE_VALID',
    payload: boolean;
} | {
    type: 'CHANGE_USERNAME_VALID',
    payload: boolean;
} | {
    type: 'CHANGE_PASSWORD_VALID',
    payload: boolean;
}

// 状态action
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
});
export const changeCanGetVerifyCode = (canGet: boolean): Action => ({
    type: CHANGE_CAN_GET_VERIFY_CODE,
    payload: canGet
});
export const changeVerifySecondsLeft = (seconds: number): Action => ({
    type: CHANGE_VERIFY_SECONDS_LEFT,
    payload: seconds
});
export const changeTelNumberValid = (valid: boolean): Action => ({
    type: CHANGE_TEL_NUMBER_VALID,
    payload: valid
});
export const changeVerifyCodeValid = (valid: boolean): Action => ({
    type: CHANGE_VERIFY_CODE_VALID,
    payload: valid
});
export const changeUsernameValid = (valid: boolean): Action => ({
    type: CHANGE_USERNAME_VALID,
    payload: valid
});
export const changePasswordValid = (valid: boolean): Action => ({
    type: CHANGE_PASSWORD_VALID,
    payload: valid
});

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
        case CHANGE_CAN_GET_VERIFY_CODE:
            return {
                ...state,
                canGetVerifyCode: action.payload
            };
        case CHANGE_VERIFY_SECONDS_LEFT:
            return {
                ...state,
                verifySecondsLeft: action.payload
            };
        case CHANGE_TEL_NUMBER_VALID:
            return {
                ...state,
                telNumberValid: action.payload
            };
        case CHANGE_VERIFY_CODE_VALID:
            return {
                ...state,
                verifyCodeValid: action.payload
            };
        case CHANGE_USERNAME_VALID:
            return {
                ...state,
                usernameValid: action.payload
            };
        case CHANGE_PASSWORD_VALID:
            return {
                ...state,
                passwordValid: action.payload
            };
        default:
            return state;
    }
}

// 业务action
// 密码登录
export const loginByPwdAndGetTel = () => (dispatch: any, getState: any) => {
    dispatch(changeLoginType('pwd'));
    const state = getState();
    if (!state.username) {
        dispatch(changeUsername(state.telNumber));
    }
}
// 验证表单
export const validateTelNumber = (telNumber: string) => (dispatch: any, getState: any) => {
    const telRegex = /^1\d{10}$/;
    if(!telRegex.test(telNumber)) {
        dispatch(changeTelNumberValid(false));
    }
}
export const validateVerifyCode = (verifyCode: string) => (dispatch: any, getState: any) => {
    const verifyRegex = /^\d{6}$/;
    if(!verifyRegex.test(verifyCode)) {
        dispatch(changeVerifyCodeValid(false));
    }
}
export const validateUsername = (username: string) => (dispatch: any, getState: any) => {
    const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
    if(!usernameRegex.test(username)) {
        dispatch(changeUsernameValid(false));
    }
}
export const validatePassword = (password: string) => (dispatch: any, getState: any) => {
    const passwordRegex = /^.{8,22}$/;
    if(!passwordRegex.test(password)) {
        dispatch(changePasswordValid(false));
    }
}
export const validateLoginByVrf = (telNumber: string, verifyCode: string) => (dispatch: any, getState: any) => {
    dispatch(validateTelNumber(telNumber));
    dispatch(validateVerifyCode(verifyCode));
}
export const validateLoginByPwd = (username: string, password: string) => (dispatch: any, getState: any) => {
    dispatch(validateUsername(username));
    dispatch(validatePassword(password));
}
export const getVerifyCode = (telNumber: string) => (dispatch: any, getState: any) => {
    dispatch(changeCanGetVerifyCode(false));
    xhr.get('/auth/verify', { params: { tel: telNumber } }).then((data: any) => {
        dispatch(changeVerifyCode(data.code));
    });

    let secondsLeft = 60;
    // 每次渲染会消耗20ms左右，导致结果误差将近一秒，如果精度要求高，可降低interval为500ms，通过new Date()获取剩余秒数
    const interval = setInterval(() => {
        if (secondsLeft > 0) {
            dispatch(changeVerifySecondsLeft(--secondsLeft));
        } else {
            dispatch(changeCanGetVerifyCode(true));
            dispatch(changeVerifySecondsLeft(60));
            clearInterval(interval);
        }

    }, 1000);
}